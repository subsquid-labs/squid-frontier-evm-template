import { ContractBase } from '../abi.support.js'
import { balanceOf, baseURI, getApproved, isApprovedForAll, name, ownerOf, supportsInterface, symbol, tokenByIndex, tokenOfOwnerByIndex, tokenURI, totalSupply } from './functions.js'
import type { BalanceOfParams, GetApprovedParams, IsApprovedForAllParams, OwnerOfParams, SupportsInterfaceParams, TokenByIndexParams, TokenOfOwnerByIndexParams, TokenURIParams } from './functions.js'

export class Contract extends ContractBase {
    balanceOf(owner: BalanceOfParams["owner"]) {
        return this.eth_call(balanceOf, {owner})
    }

    baseURI() {
        return this.eth_call(baseURI, {})
    }

    getApproved(tokenId: GetApprovedParams["tokenId"]) {
        return this.eth_call(getApproved, {tokenId})
    }

    isApprovedForAll(owner: IsApprovedForAllParams["owner"], operator: IsApprovedForAllParams["operator"]) {
        return this.eth_call(isApprovedForAll, {owner, operator})
    }

    name() {
        return this.eth_call(name, {})
    }

    ownerOf(tokenId: OwnerOfParams["tokenId"]) {
        return this.eth_call(ownerOf, {tokenId})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(symbol, {})
    }

    tokenByIndex(index: TokenByIndexParams["index"]) {
        return this.eth_call(tokenByIndex, {index})
    }

    tokenOfOwnerByIndex(owner: TokenOfOwnerByIndexParams["owner"], index: TokenOfOwnerByIndexParams["index"]) {
        return this.eth_call(tokenOfOwnerByIndex, {owner, index})
    }

    tokenURI(tokenId: TokenURIParams["tokenId"]) {
        return this.eth_call(tokenURI, {tokenId})
    }

    totalSupply() {
        return this.eth_call(totalSupply, {})
    }
}
