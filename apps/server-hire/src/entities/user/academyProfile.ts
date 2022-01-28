import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import Address from '../address';
import Images from '../image';
import User from './user';

abstract class AuthBusiness {
  @Column()
  bussiness_number: string;

  @Column()
  representation_name: string;

  @Column()
  open_date: string;
}

@Entity()
class AcademyProfile extends AuthBusiness {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Images)
  @JoinColumn()
  logo: Images;

  @Column()
  academy_name: string;

  @Column()
  representation_number: string;

  @Column()
  introduce: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}

export default AcademyProfile;
