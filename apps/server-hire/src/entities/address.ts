import AddressBasic from '@Libs/entites/address';
import { Entity, OneToOne } from 'typeorm';
import AcademyProfile from './user/academyProfile';

@Entity()
class Address extends AddressBasic {
  @OneToOne(() => AcademyProfile)
  academy: AcademyProfile;
}

export default Address;
