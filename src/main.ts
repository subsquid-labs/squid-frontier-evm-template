import {In} from 'typeorm'
import {EvmLog, getEvmLog} from '@subsquid/frontier'
import {EvmLogEvent, SubstrateBlock} from '@subsquid/substrate-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import * as erc721 from './abi/erc721'
import {getContractEntity} from './contract'
import {Owner, Token, Transfer} from './model'
import {CONTRACT_ADDRESS, ProcessorContext, processor} from './processor'

processor.run(new TypeormDatabase(), async (ctx) => {
    const transfersData: TransferData[] = []

    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.name === 'EVM.Log') {
                // EVM log extracted from the substrate event
                const evmLog = getEvmLog(ctx, item.event)
                const transfer = handleTransfer(block.header, item.event, evmLog)
                transfersData.push(transfer)
            }
        }
    }

    await saveTransfers(ctx, transfersData)
})

type TransferData = {
    id: string
    from: string
    to: string
    token: bigint
    timestamp: bigint
    block: number
    transactionHash: string
}

function handleTransfer(block: SubstrateBlock, event: EvmLogEvent, evmLog: EvmLog): TransferData {
    const {from, to, tokenId} = erc721.events.Transfer.decode(evmLog)

    const transfer: TransferData = {
        id: event.id,
        token: tokenId,
        from,
        to,
        timestamp: BigInt(block.timestamp),
        block: block.height,
        transactionHash: event.evmTxHash,
    }

    return transfer
}

async function saveTransfers(ctx: ProcessorContext<Store>, transfersData: TransferData[]) {
    const tokensIds: Set<string> = new Set()
    const ownersIds: Set<string> = new Set()

    for (const transferData of transfersData) {
        tokensIds.add(transferData.token.toString())
        ownersIds.add(transferData.from)
        ownersIds.add(transferData.to)
    }

    const transfers: Set<Transfer> = new Set()

    const tokens: Map<string, Token> = new Map(
        (await ctx.store.findBy(Token, {id: In([...tokensIds])})).map((token) => [token.id, token])
    )

    const owners: Map<string, Owner> = new Map(
        (await ctx.store.findBy(Owner, {id: In([...ownersIds])})).map((owner) => [owner.id, owner])
    )

    if (process.env.RPC_ENDPOINT == undefined) {
        ctx.log.warn(`RPC_ENDPOINT env variable is not set`)
    }

    for (const transferData of transfersData) {
        const contract = new erc721.Contract(ctx, {height: transferData.block}, CONTRACT_ADDRESS)

        let from = owners.get(transferData.from)
        if (from == null) {
            from = new Owner({id: transferData.from, balance: 0n})
            owners.set(from.id, from)
        }

        let to = owners.get(transferData.to)
        if (to == null) {
            to = new Owner({id: transferData.to, balance: 0n})
            owners.set(to.id, to)
        }

        const tokenId = transferData.token.toString()

        let token = tokens.get(tokenId)
        if (token == null) {
            token = new Token({
                id: tokenId,
                // TODO: use multicall here to batch
                //        contract calls and speed up indexing
                uri: await contract.tokenURI(transferData.token),
                contract: await getContractEntity(ctx.store),
            })
            tokens.set(token.id, token)
            ctx.log.info(`Upserted NFT: ${token.id}`)
        }
        token.owner = to

        const {id, block, transactionHash, timestamp} = transferData

        const transfer = new Transfer({
            id,
            block,
            timestamp,
            transactionHash,
            from,
            to,
            token,
        })

        transfers.add(transfer)
    }

    await ctx.store.save([...owners.values()])
    await ctx.store.save([...tokens.values()])
    await ctx.store.save([...transfers])
}
