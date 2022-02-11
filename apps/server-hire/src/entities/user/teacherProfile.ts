import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Images from '../image';
import Yoga from '../yoga/yoga';
import User from './user';

@Entity()
class TeacherProfile {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Images)
  @JoinColumn()
  logo: Images;

  @OneToMany(() => Yoga, (yoga) => yoga.teacher)
  yoga: Yoga[];

  @Column()
  introduce: string;
}

export default TeacherProfile;
