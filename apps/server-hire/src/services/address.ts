import { getManager } from 'typeorm';
import Address from '@SH/Entities/address';
import { addressType } from '@Libs/interface/address';

export default async function createAddress(address: addressType) {
  const { x, y, region1Depth, region2Depth, region3Depth, roadName, mainBuildingNo, subBuildingNo } = address;
  const manager = getManager();
  const createdAddress = manager.create(Address, {
    x,
    y,
    region_1_depth: region1Depth,
    region_2_depth: region2Depth,
    region_3_depth: region3Depth,
    road_name: roadName,
    main_building_no: mainBuildingNo,
    sub_building_no: subBuildingNo,
  });
  await manager.save(createdAddress);
  return createdAddress;
}
