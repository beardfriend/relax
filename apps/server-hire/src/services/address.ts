import { addressType } from '@Libs/interface/address';
import Address from '@SH/Entities/address';
import { getManager } from 'typeorm';

export default async function createAddress(address: addressType) {
  if (address === undefined) {
    return undefined;
  }
  const { x, y, region_1_depth, region_2_depth, region_3_depth, road_name, main_building_no, sub_building_no } =
    address;
  const manager = getManager();
  const createdAddress = manager.create(Address, {
    x,
    y,
    region_1_depth,
    region_2_depth,
    region_3_depth,
    road_name,
    main_building_no,
    sub_building_no,
  });
  await manager.save(createdAddress);
  return createdAddress;
}
