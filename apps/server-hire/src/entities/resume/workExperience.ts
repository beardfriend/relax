import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Primary } from '@Libs/entites/abstract';
import ClassContent from './classContent';
import Resume from './resume';

@Entity()
class WorkExperience extends Primary {
  @Column()
  academy_name: string;

  @Column()
  work_start: string;

  @Column()
  work_end: string;

  @Column()
  etc_explain: string;

  @OneToMany(() => ClassContent, (data) => data.work_experience)
  class_content: ClassContent[];

  @ManyToOne(() => Resume)
  resume: Resume;
}

export default WorkExperience;
