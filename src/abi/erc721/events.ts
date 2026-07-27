import { address, bool, uint256 } from '@subsquid/evm-codec'
import { event, indexed } from '../abi.support.js'
import type { EventParams as EParams } from '../abi.support.js'

/** Approval(address,address,uint256) */
export const Approval = event('0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', {
    owner: indexed(address),
    approved: indexed(address),
    tokenId: indexed(uint256),
})
export type ApprovalEventArgs = EParams<typeof Approval>

/** ApprovalForAll(address,address,bool) */
export const ApprovalForAll = event('0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31', {
    owner: indexed(address),
    operator: indexed(address),
    approved: bool,
})
export type ApprovalForAllEventArgs = EParams<typeof ApprovalForAll>

/** Transfer(address,address,uint256) */
export const Transfer = event('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', {
    from: indexed(address),
    to: indexed(address),
    tokenId: indexed(uint256),
})
export type TransferEventArgs = EParams<typeof Transfer>
