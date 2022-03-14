import { UpdateColumn } from '@Libs/entites/abstract';
import { Exclude } from 'class-transformer';
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Recruitement from '../recruitment/recruitment';
import AcademyBusiness from './academyBusiness';
import AcademyProfile from './academyProfile';
import User from './user';

@Entity()
class Academy extends UpdateColumn {
  @PrimaryColumn()
  @Exclude()
  id: number;

  @OneToOne(() => User, { primary: true })
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToMany(() => Recruitement, (recruitement) => recruitement.writer)
  recruitement: Recruitement[];

  @OneToOne(() => AcademyBusiness)
  @JoinColumn()
  business_info: AcademyBusiness;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academy_profile: AcademyProfile;
}

export default Academy;
