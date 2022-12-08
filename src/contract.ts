import { Store } from "@subsquid/typeorm-store";
import { Contract } from "./model";

export const contractAddress = "0xb654611f84a8dc429ba3cb4fda9fad236c505a1a";
export const MULTICALL_CONTRACT='0x83e3b61886770de2F64AAcaD2724ED4f08F7f36B'

export function createContractEntity(): Contract {
  return new Contract({
    id: contractAddress,
    name: "Moonsama",
    symbol: "MSAMA",
    totalSupply: 1000n,
  });
}

let contractEntity: Contract | undefined;

export async function getContractEntity(store: Store): Promise<Contract> {
  if (contractEntity == null) {
    contractEntity = await store.get(Contract, contractAddress);
    if (contractEntity == null) {
      contractEntity = createContractEntity();
      await store.insert(contractEntity);
    }
  }
  return contractEntity;
}
