import { AcademyDto } from '@Libs/dto/academy';
import { UpdateColumn } from '@Libs/entites/abstract';
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Recruitment from '../recruitment/recruitment';
import AcademyBusiness from './academyBusiness';
import AcademyProfile from './academyProfile';
import User from './user';

@Entity()
class Academy extends AcademyDto implements UpdateColumn {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToMany(() => Recruitment, (recruitment) => recruitment.writer)
  recruitment: Recruitment[];

  @OneToOne(() => AcademyBusiness)
  @JoinColumn()
  businessInfo: AcademyBusiness;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academyProfile: AcademyProfile;
}

export default Academy;
