import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { userType, signUpType } from '@Constants/Types';
import { Primary } from '@Libs/entites/abstract';
import TeacherProfile from './teacherProfile';
import AcademyProfile from './academyProfile';
import Teacher from './teacher';

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
  teacher_profile: TeacherProfile;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academy_profile: AcademyProfile;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;
}

export default User;