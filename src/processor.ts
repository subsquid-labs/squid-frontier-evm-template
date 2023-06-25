import {lookupArchive} from '@subsquid/archive-registry'
import {
    BatchContext,
    BatchProcessorCallItem,
    BatchProcessorEventItem,
    BatchProcessorItem,
    SubstrateBatchProcessor,
} from '@subsquid/substrate-processor'
import * as erc721 from './abi/erc721'

export const CONTRACT_ADDRESS = '0xb654611f84a8dc429ba3cb4fda9fad236c505a1a'
export const MULTICALL_ADDRESS = '0x83e3b61886770de2f64aacad2724ed4f08f7f36b'

export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        // FIXME: set RPC_ENDPOINT secret when deploying to Aquarium
        //        See https://docs.subsquid.io/deploy-squid/env-variables/
        chain: process.env.RPC_ENDPOINT || 'wss://wss.api.moonriver.moonbeam.network',
        archive: lookupArchive('moonriver', {type: 'Substrate'}),
    })
    .addEvmLog(CONTRACT_ADDRESS, {
        filter: [[erc721.events.Transfer.topic]],
    })

export type Item = BatchProcessorItem<typeof processor>
export type EventItem = BatchProcessorEventItem<typeof processor>
export type CallItem = BatchProcessorCallItem<typeof processor>
export type ProcessorContext<Store> = BatchContext<Store, Item>
