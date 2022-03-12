import { UpdateColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Address from '../address';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Academy from './academy';

@Entity()
class AcademyProfile extends UpdateColumn {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Academy, { cascade: true })
  @JoinColumn({ name: 'id' })
  user: Academy;

  @OneToOne(() => Images, { cascade: true })
  @JoinColumn()
  logo: Images;

  @Column({ default: null })
  academy_name: string;

  @Column({ default: null })
  representation_number: string;

  @Column({ default: null })
  introduce: string;

  @OneToMany(() => Images, (image) => image.academy_introduce)
  introduce_image: Images[];

  @OneToMany(() => Yoga, (yoga) => yoga.academy)
  yoga: Yoga[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}

export default AcademyProfile;
