import { AcademyProfileDto } from '@Libs/dto/academy';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Address from '../address';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Academy from './academy';

@Entity()
class AcademyProfile extends AcademyProfileDto {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Academy, { cascade: true })
  @JoinColumn({ name: 'id' })
  user: Academy;

  @OneToOne(() => Images, { cascade: true })
  @JoinColumn()
  logo: Images;

  @Column({ default: null })
  academyName: string;

  @Column({ default: null })
  representationNumber: string;

  @Column({ default: null })
  introduce: string;

  @OneToMany(() => Images, (image) => image.academyIntroduce)
  introduceImage: Images[];

  @OneToMany(() => Yoga, (yoga) => yoga.academy, { cascade: true })
  yoga: Yoga[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}

export default AcademyProfile;
