import {assertNotNull} from '@subsquid/util-internal'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'
import * as erc721 from './abi/erc721'

export const CONTRACT_ADDRESS = '0xb654611f84a8dc429ba3cb4fda9fad236c505a1a'

export const processor = new SubstrateBatchProcessor()
    // SQD Network gateway (historical data). Browse networks at
    // https://docs.sqd.dev/en/data/substrate
    .setGateway('https://v2.archive.subsquid.io/network/moonriver-substrate')
    // Self-hosted v2 gateways now require an API key.
    // Create one at https://docs.sqd.dev/en/data/api-keys and supply it as:
    // .setGateway({
    //     url: 'https://v2.archive.subsquid.io/network/moonriver-substrate',
    //     apiKey: process.env.SQD_API_KEY,
    // })
    // Chain RPC endpoint is required on Substrate for metadata and real-time updates
    .setRpcEndpoint({
        // Set via .env for local runs or via secrets when deploying to SQD Cloud
        // https://docs.sqd.dev/en/cloud/resources/env-variables
        url: assertNotNull(process.env.RPC_MOONRIVER_SUBSTRATE_HTTP, 'No RPC endpoint supplied'),
        // More RPC connection options at https://docs.sqd.dev/en/sdk/squid-sdk/substrate/reference/substrate-processor/general
        rateLimit: 10
    })
    .addEvmLog({
        address: [CONTRACT_ADDRESS],
        topic0: [erc721.events.Transfer.topic],
        extrinsic: true
    })
    .setFields({
        block: {
            timestamp: true
        },
        extrinsic: {
            hash: true
        }
    })
    .setBlockRange({
        from: 568_970
    })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
