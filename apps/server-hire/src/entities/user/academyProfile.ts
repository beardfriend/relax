import { PrimaryJoinColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Address from '../address';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Academy from './academy';

@Entity()
class AcademyProfile extends PrimaryJoinColumn {
  @OneToOne(() => Academy, { cascade: true })
  @JoinColumn({ name: 'id' })
  user: Academy;

  @OneToOne(() => Images, { nullable: true })
  @JoinColumn()
  logo: Images;

  @Column({ default: null })
  academy_name: string;

  @Column({ default: null })
  representation_number: string;

  @Column({ default: null })
  introduce: string;

  @OneToMany(() => Images, (image) => image.academy_introduce, { nullable: true })
  @JoinColumn()
  introduce_image: Images[];

  @OneToMany(() => Yoga, (yoga) => yoga.acadmey)
  yoga: Yoga[];

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  address: Address;
}

export default AcademyProfile;
