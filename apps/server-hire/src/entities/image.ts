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

  @OneToOne(() => TeacherProfile, { nullable: true })
  @JoinColumn()
  teacherProfile: TeacherProfile;

  @ManyToOne(() => Resume, (resume) => resume.images, { nullable: true })
  resume: Resume;

  @OneToOne(() => AcademyProfile, { nullable: true })
  academyLogo: AcademyProfile;

  @ManyToOne(() => AcademyProfile, (profile) => profile.introduceImage, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  academyIntroduce: AcademyProfile;
}

export default Images;
