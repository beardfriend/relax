import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => Images, { nullable: true })
  @JoinTable()
  images: Images[];

  @OneToMany(() => Certification, (certification) => certification.resume, { nullable: true })
  certification?: Certification[];

  @OneToMany(() => Education, (education) => education.resume, { nullable: true })
  education?: Education[];

  @OneToMany(() => WorkExperience, (work_experience) => work_experience.resume, { nullable: true })
  work_experience?: WorkExperience[];
}

export default Resume;
