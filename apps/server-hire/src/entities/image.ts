import Image from '@Libs/entites/image';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { imageType } from '@Constants/Types';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import AcademyProfile from '@SH/Entities/user/academyProfile';

@Entity()
class Images extends Image {
  @Column({ type: 'enum', enum: imageType })
  category: imageType;

  @OneToOne(() => TeacherProfile)
  @JoinColumn()
  teacher_profile: TeacherProfile;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academy_logo: AcademyProfile;
}

export default Images;
