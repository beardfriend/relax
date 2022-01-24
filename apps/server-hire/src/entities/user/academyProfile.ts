import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import User from './user';

abstract class AuthBusiness {
  @Column()
  bussiness_number: string;

  @Column()
  representation_name: string;

  @Column()
  open_date: string;
}

@Entity()
class AcademyProfile extends AuthBusiness {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;

  @Column()
  academy_name: string;

  @Column()
  representation_number: string;

  @Column()
  introduce: string;
}

export default AcademyProfile;
