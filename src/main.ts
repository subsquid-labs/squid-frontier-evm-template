import assert from 'assert'
import {In} from 'typeorm'

import {EvmLog, getEvmLog} from '@subsquid/frontier'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import {last} from '@subsquid/util-internal'

import * as erc721 from './abi/erc721'
import {Token, Transfer} from './model'
import {
    processor,
    CONTRACT_ADDRESS,
    ProcessorContext,
    Block
} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const transfersData: TransferData[] = []

    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} arrived without a timestamp`)
        for (const event of block.events) {
            if (event.name === 'EVM.Log') {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                // EVM log extracted from the substrate event
                const evmLog = getEvmLog(event)
                if (evmLog.address !== CONTRACT_ADDRESS) {
                    ctx.log.error(`Got a EVM.Log from a non-requested address ${evmLog.address}`)
                    continue
                }
                const {from, to, tokenId: token} = erc721.events.Transfer.decode(evmLog)
                transfersData.push({
                    id: event.id,
                    token,
                    from,
                    to,
                    timestamp: BigInt(block.header.timestamp),
                    block: block.header.height,
                    extrinsicHash: event.extrinsic.hash
                })
            }
        }
    }

    const tokens: Map<string, Token> = await createTokens(ctx, transfersData)
    const transfers: Transfer[] = createTransfers(transfersData, tokens)

    await ctx.store.upsert([...tokens.values()])
    await ctx.store.insert(transfers)
})

type TransferData = {
    id: string
    from: string
    to: string
    token: bigint
    timestamp: bigint
    block: number
    extrinsicHash: string
}

async function createTokens(ctx: ProcessorContext<Store>, transfersData: TransferData[]): Promise<Map<string, Token>> {
    const tokensIds: Set<string> = new Set()
    for (const trd of transfersData) {
        tokensIds.add(trd.token.toString())
    }
    const tokens: Map<string, Token> = new Map(
        (await ctx.store.findBy(Token, {id: In([...tokensIds])})).map((token) => [token.id, token])
    )

    for (const trd of transfersData) {
        const tokenId = trd.token.toString()
        if (tokens.has(tokenId)) {
            tokens.get(tokenId)!.owner = trd.to
        }
        else {
            tokens.set(tokenId, new Token({
                id: tokenId,
                owner: trd.to
            }))
        }
    }

    return tokens
}

function createTransfers(transfersData: TransferData[], tokens: Map<string,Token>): Transfer[] {
    return transfersData.map(tdata => {
        return new Transfer({
            ...tdata,
            token: tokens.get(tdata.token.toString())
        })
    })
}
