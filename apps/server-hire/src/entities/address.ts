import AddressBasic from '@Libs/entites/address';
import { Entity, OneToOne } from 'typeorm';
import AcademyProfile from './user/academyProfile';

@Entity()
class Address extends AddressBasic {
  @OneToOne(() => AcademyProfile)
  academy: AcademyProfile;

  getFullAddress() {
    return this.region_1_depth + this.region_2_depth + this.region_3_depth;
  }
}

export default Address;
