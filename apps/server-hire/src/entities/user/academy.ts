import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Recruitement from '../recruitment/recruitment';
import AcademyBusiness from './academyBusiness';
import User from './user';

@Entity()
class Academy {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  id: User;

  @OneToMany(() => Recruitement, (recruitement) => recruitement.writer)
  recruitement: Recruitement[];

  @OneToOne(() => AcademyBusiness)
  @JoinColumn()
  business_info: AcademyBusiness;
}
export default Academy;
