import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Images from '../image';
import Yoga from '../yoga/yoga';
import User from './user';

@Entity()
class TeacherProfile {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToOne(() => Images)
  @JoinColumn()
  profile: Images;

  @OneToMany(() => Yoga, (yoga) => yoga.teacher)
  yoga: Yoga[];

  @Column({ nullable: true })
  introduce: string;
}

export default TeacherProfile;
