import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import User from '../user/user';
import Certification from './certification';
import Education from './education';
import WorkExperience from './workExperience';

@Entity()
class Resume extends Primary {
  @Column()
  resume_name: string;

  @Column()
  is_open: boolean;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Certification, (certification) => certification.resume)
  certification: Certification[];

  @OneToMany(() => Education, (education) => education.resume)
  education: Education[];

  @OneToMany(() => WorkExperience, (work_experience) => work_experience.resume)
  work_experience: WorkExperience[];
}

export default Resume;
