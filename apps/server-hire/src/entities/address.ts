import AddressBasic from '@Libs/entites/address';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import AcademyProfile from './user/academyProfile';

@Entity()
class Address extends AddressBasic {
  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academy: AcademyProfile;
}

export default Address;
