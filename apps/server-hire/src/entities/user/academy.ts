import { AcademyDto } from '@Libs/dto/academy';
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Recruitement from '../recruitment/recruitment';
import AcademyBusiness from './academyBusiness';
import AcademyProfile from './academyProfile';
import User from './user';

@Entity()
class Academy extends AcademyDto {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User, { primary: true })
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToMany(() => Recruitement, (recruitement) => recruitement.writer)
  recruitement: Recruitement[];

  @OneToOne(() => AcademyBusiness)
  @JoinColumn()
  businessInfo: AcademyBusiness;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academyProfile: AcademyProfile;
}

export default Academy;
