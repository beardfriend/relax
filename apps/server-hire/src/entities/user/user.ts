import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { userType, signUpType } from '@Constants/Types';
import { Primary } from '@Libs/entites/abstract';
import Resume from '@SH/Entities/resume/resume';
import TeacherProfile from './teacherProfile';
import AcademyProfile from './academyProfile';

@Entity()
class User extends Primary {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ type: 'enum', enum: userType, default: null })
  role: userType;

  @Column({ type: 'enum', enum: signUpType, default: null })
  signup_type: signUpType;

  @OneToOne(() => TeacherProfile)
  @JoinColumn()
  teacher: TeacherProfile;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academy: AcademyProfile;

  @OneToMany(() => Resume, (resume) => resume.user)
  resume: Resume[];
}

export default User;
