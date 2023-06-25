import {Store} from '@subsquid/typeorm-store'
import {Contract} from './model'
import {CONTRACT_ADDRESS} from './processor'

export function createContractEntity(): Contract {
    return new Contract({
        id: CONTRACT_ADDRESS,
        name: 'Moonsama',
        symbol: 'MSAMA',
        totalSupply: 1000n,
    })
}

let contractEntity: Contract | undefined

export async function getContractEntity(store: Store): Promise<Contract> {
    if (contractEntity == null) {
        contractEntity = await store.get(Contract, CONTRACT_ADDRESS)
        if (contractEntity == null) {
            contractEntity = createContractEntity()
            await store.insert(contractEntity)
        }
    }
    return contractEntity
}
