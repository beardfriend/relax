import { UpdateColumn } from '@Libs/entites/abstract';
import Resume from '@SH/Entities/resume/resume';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import TeacherProfile from './teacherProfile';
import User from './user';

@Entity()
class Teacher extends UpdateColumn {
  @OneToOne(() => User, { primary: true, nullable: false, cascade: true })
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToOne(() => TeacherProfile)
  @JoinColumn()
  teacherProfile: TeacherProfile;

  @OneToMany(() => Resume, (resume) => resume.teacher)
  resume: Resume[];
}
export default Teacher;
