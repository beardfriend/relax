import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import Images from '../image';
import User from '../user/user';
import Certification from './certification';
import Education from './education';
import WorkExperience from './workExperience';

@Entity()
class Resume extends Primary {
  @Column()
  resume_name: string;

  @Column({ nullable: true })
  is_open: boolean;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Images, (image) => image.resume, { nullable: true })
  images: Images[];

  @OneToMany(() => Certification, (certification) => certification.resume, { nullable: true })
  certification?: Certification[];

  @OneToMany(() => Education, (education) => education.resume, { nullable: true })
  education?: Education[];

  @OneToMany(() => WorkExperience, (work_experience) => work_experience.resume, { nullable: true })
  work_experience?: WorkExperience[];
}

export default Resume;
