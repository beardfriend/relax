import { AddressDto } from '@Libs/dto/address';
import { Column } from 'typeorm';
import { Primary } from './abstract';

abstract class AddressBasic extends AddressDto implements Primary {
  @Column({ type: 'float' })
  x: number;

  @Column({ type: 'float' })
  y: number;

  @Column()
  region1Depth: string;

  @Column()
  region2Depth: string;

  @Column()
  region3Depth: string;

  @Column()
  roadName: string;

  @Column()
  mainBuildingNo: string;

  @Column()
  subBuildingNo: string;
}

export default AddressBasic;
