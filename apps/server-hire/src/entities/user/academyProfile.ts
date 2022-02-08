import { yogaSortType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import Address from '../address';
import Images from '../image';
import User from './user';

abstract class AuthBusiness extends Primary {
  @Column()
  bussiness_number: string;

  @Column()
  representation_name: string;

  @Column()
  open_date: string;
}

@Entity()
class AcademyProfile extends AuthBusiness {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Images, { nullable: true })
  @JoinColumn()
  logo: Images;

  @Column({ default: null })
  academy_name: string;

  @Column({ default: null })
  representation_number: string;

  @Column({ default: null })
  introduce: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true, nullable: true })
  yogaType: yogaSortType[];

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  address: Address;
}

export default AcademyProfile;
