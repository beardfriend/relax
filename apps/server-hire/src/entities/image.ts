import Image from '@Libs/entites/image';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { imageType } from '@Constants/Types';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import Resume from '@SH/Entities/resume/resume';

@Entity()
class Images extends Image {
  @Column({ type: 'enum', enum: imageType })
  category: imageType;

  @OneToOne(() => TeacherProfile)
  @JoinColumn()
  teacher_profile: TeacherProfile;

  @ManyToOne(() => Resume, (resume) => resume.images)
  resume: Resume;

  @OneToOne(() => AcademyProfile)
  @JoinColumn()
  academy_logo: AcademyProfile;

  @ManyToOne(() => AcademyProfile, (profile) => profile.introduce_image)
  academy_introduce: AcademyProfile;
}

export default Images;
