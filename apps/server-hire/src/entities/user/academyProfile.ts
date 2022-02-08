import { yogaSortType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Address from '../address';
import Images from '../image';
import User from './user';

@Entity()
class AcademyProfile extends Primary {
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
