import AcademyProfile from '@SH/Entities/user/academyProfile';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import { Primary } from '@Libs/entites/abstract';
import { yogaSortType } from '@Constants/Types';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
class ProfileYoga extends Primary {
  @Column({ type: 'enum', enum: yogaSortType })
  yoga_name: yogaSortType;

  @ManyToOne(() => AcademyProfile, (academy) => academy.user)
  academy: AcademyProfile;

  @ManyToOne(() => TeacherProfile, (teacher) => teacher.user)
  teacher: TeacherProfile;
}

export default ProfileYoga;
