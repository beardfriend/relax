import { Column } from 'typeorm';
import { Primary } from './abstract';

abstract class AddressBasic extends Primary {
  @Column({ type: 'float' })
  x: number;

  @Column({ type: 'float' })
  y: number;

  @Column()
  region_1_depth: string;

  @Column()
  region_2_depth: string;

  @Column()
  region_3_depth: string;

  @Column()
  road_name: string;

  @Column()
  main_building_no: string;

  @Column()
  sub_building_no: string;
}

export default AddressBasic;
