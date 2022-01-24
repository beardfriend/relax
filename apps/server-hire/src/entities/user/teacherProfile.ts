import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import User from './user';

@Entity()
class TeacherProfile {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;

  @Column()
  introduce: string;
}

export default TeacherProfile;
