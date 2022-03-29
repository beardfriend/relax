import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import Resume from './resume';

@Entity()
class Education extends Primary {
  @Column()
  schoolName: string;

  @Column()
  major: string;

  @Column()
  degree: string;

  @Column()
  admissionDate: string;

  @Column()
  graduatedDate: string;

  @Column()
  etcExplain: string;

  @ManyToOne(() => Resume, (resume) => resume.education)
  resume: Resume;
}

export default Education;
