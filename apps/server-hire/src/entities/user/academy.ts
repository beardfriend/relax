import { PrimaryJoinColumn } from '@Libs/entites/abstract';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Recruitement from '../recruitment/recruitment';
import AcademyBusiness from './academyBusiness';
import AcademyProfile from './academyProfile';
import User from './user';

@Entity()
class Academy extends PrimaryJoinColumn {
  @OneToOne(() => User, { cascade: true })
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
