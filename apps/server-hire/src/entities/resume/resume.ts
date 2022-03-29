import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import Images from '../image';
import ResumeApplyList from '../resumeApplyList';
import Teacher from '../user/teacher';
import Certification from './certification';
import Education from './education';
import WorkExperience from './workExperience';

@Entity()
class Resume extends Primary {
  @OneToMany(() => ResumeApplyList, (applyList) => applyList.resume)
  resumeApplyList: ResumeApplyList;

  @ManyToOne(() => Teacher, (teacher) => teacher.resume)
  teacher: Teacher;

  @Column()
  resumeName: string;

  @Column()
  isOpen: boolean;

  @OneToMany(() => Images, (image) => image.resume)
  images: Images[];

  @OneToMany(() => Certification, (certification) => certification.resume)
  certification: Certification[];

  @OneToMany(() => Education, (education) => education.resume)
  education: Education[];

  @OneToMany(() => WorkExperience, (work_experience) => work_experience.resume)
  workExperience: WorkExperience[];
}

export default Resume;
