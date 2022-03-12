import { yogaSortType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import { Entity, Column, ManyToOne } from 'typeorm';
import AcademyProfile from '../user/academyProfile';
import TeacherProfile from '../user/teacherProfile';

@Entity()
class Yoga extends Primary {
  @Column({ type: 'enum', enum: yogaSortType })
  name: yogaSortType;

  @ManyToOne(() => TeacherProfile, (profile) => profile.yoga)
  teacher: TeacherProfile;

  @ManyToOne(() => AcademyProfile, (profile) => profile.yoga)
  academy: AcademyProfile;
}

export default Yoga;
