import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Address from '../address';
import Images from '../image';
import Yoga from '../yoga/yoga';
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

  @OneToMany(() => Yoga, (yoga) => yoga.acadmey)
  yoga: Yoga[];

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  address: Address;
}

export default AcademyProfile;
