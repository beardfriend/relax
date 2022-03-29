import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Primary } from '@Libs/entites/abstract';
import ClassContent from './classContent';
import Resume from './resume';

@Entity()
class WorkExperience extends Primary {
  @Column()
  academyName: string;

  @Column()
  work_start: string;

  @Column()
  work_end: string;

  @Column()
  etc_explain: string;

  @OneToMany(() => ClassContent, (data) => data.workExperience)
  classContent: ClassContent[];

  @ManyToOne(() => Resume, (resume) => resume.workExperience)
  resume: Resume;
}

export default WorkExperience;
