import { addressType } from '@Libs/interface/address';
import Address from '@SH/Entities/address';
import { getManager } from 'typeorm';

export default async function createAddress(address: addressType) {
  if (address === undefined) {
    return undefined;
  }
  const manager = getManager();
  const createdAddress = manager.create(Address, address);
  await manager.save(createdAddress);
  return createdAddress;
}
