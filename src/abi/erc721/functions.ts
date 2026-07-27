import { address, bool, bytes, bytes4, string, uint256 } from '@subsquid/evm-codec'
import { func } from '../abi.support.js'
import type { FunctionArguments, FunctionReturn } from '../abi.support.js'

/** approve(address,uint256) */
export const approve = func('0x095ea7b3', {
    to: address,
    tokenId: uint256,
})
export type ApproveParams = FunctionArguments<typeof approve>
export type ApproveReturn = FunctionReturn<typeof approve>

/** balanceOf(address) */
export const balanceOf = func('0x70a08231', {
    owner: address,
}, uint256)
export type BalanceOfParams = FunctionArguments<typeof balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof balanceOf>

/** baseURI() */
export const baseURI = func('0x6c0360eb', {}, string)
export type BaseURIParams = FunctionArguments<typeof baseURI>
export type BaseURIReturn = FunctionReturn<typeof baseURI>

/** getApproved(uint256) */
export const getApproved = func('0x081812fc', {
    tokenId: uint256,
}, address)
export type GetApprovedParams = FunctionArguments<typeof getApproved>
export type GetApprovedReturn = FunctionReturn<typeof getApproved>

/** isApprovedForAll(address,address) */
export const isApprovedForAll = func('0xe985e9c5', {
    owner: address,
    operator: address,
}, bool)
export type IsApprovedForAllParams = FunctionArguments<typeof isApprovedForAll>
export type IsApprovedForAllReturn = FunctionReturn<typeof isApprovedForAll>

/** name() */
export const name = func('0x06fdde03', {}, string)
export type NameParams = FunctionArguments<typeof name>
export type NameReturn = FunctionReturn<typeof name>

/** ownerOf(uint256) */
export const ownerOf = func('0x6352211e', {
    tokenId: uint256,
}, address)
export type OwnerOfParams = FunctionArguments<typeof ownerOf>
export type OwnerOfReturn = FunctionReturn<typeof ownerOf>

/** safeTransferFrom(address,address,uint256) */
export const safeTransferFrom = func('0x42842e0e', {
    from: address,
    to: address,
    tokenId: uint256,
})
export type SafeTransferFromParams = FunctionArguments<typeof safeTransferFrom>
export type SafeTransferFromReturn = FunctionReturn<typeof safeTransferFrom>

/** safeTransferFrom(address,address,uint256,bytes) */
export const safeTransferFrom_1 = func('0xb88d4fde', {
    from: address,
    to: address,
    tokenId: uint256,
    _data: bytes,
})
export type SafeTransferFromParams_1 = FunctionArguments<typeof safeTransferFrom_1>
export type SafeTransferFromReturn_1 = FunctionReturn<typeof safeTransferFrom_1>

/** setApprovalForAll(address,bool) */
export const setApprovalForAll = func('0xa22cb465', {
    operator: address,
    approved: bool,
})
export type SetApprovalForAllParams = FunctionArguments<typeof setApprovalForAll>
export type SetApprovalForAllReturn = FunctionReturn<typeof setApprovalForAll>

/** supportsInterface(bytes4) */
export const supportsInterface = func('0x01ffc9a7', {
    interfaceId: bytes4,
}, bool)
export type SupportsInterfaceParams = FunctionArguments<typeof supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof supportsInterface>

/** symbol() */
export const symbol = func('0x95d89b41', {}, string)
export type SymbolParams = FunctionArguments<typeof symbol>
export type SymbolReturn = FunctionReturn<typeof symbol>

/** tokenByIndex(uint256) */
export const tokenByIndex = func('0x4f6ccce7', {
    index: uint256,
}, uint256)
export type TokenByIndexParams = FunctionArguments<typeof tokenByIndex>
export type TokenByIndexReturn = FunctionReturn<typeof tokenByIndex>

/** tokenOfOwnerByIndex(address,uint256) */
export const tokenOfOwnerByIndex = func('0x2f745c59', {
    owner: address,
    index: uint256,
}, uint256)
export type TokenOfOwnerByIndexParams = FunctionArguments<typeof tokenOfOwnerByIndex>
export type TokenOfOwnerByIndexReturn = FunctionReturn<typeof tokenOfOwnerByIndex>

/** tokenURI(uint256) */
export const tokenURI = func('0xc87b56dd', {
    tokenId: uint256,
}, string)
export type TokenURIParams = FunctionArguments<typeof tokenURI>
export type TokenURIReturn = FunctionReturn<typeof tokenURI>

/** totalSupply() */
export const totalSupply = func('0x18160ddd', {}, uint256)
export type TotalSupplyParams = FunctionArguments<typeof totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof totalSupply>

/** transferFrom(address,address,uint256) */
export const transferFrom = func('0x23b872dd', {
    from: address,
    to: address,
    tokenId: uint256,
})
export type TransferFromParams = FunctionArguments<typeof transferFrom>
export type TransferFromReturn = FunctionReturn<typeof transferFrom>
