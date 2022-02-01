import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import Resume from '@SH/Entities/resume/resume';
import User from './user';

@Entity()
class Teacher {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  id: User;

  @OneToMany(() => Resume, (resume) => resume.teacher)
  resume: Resume[];
}
export default Teacher;
