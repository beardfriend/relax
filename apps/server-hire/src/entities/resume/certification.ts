import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Primary } from '@Libs/entites/abstract';
import Resume from './resume';

@Entity()
class Certification extends Primary {
  @Column()
  agencyName: string;

  @Column()
  classStart: string;

  @Column()
  classEnd: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];

  @Column()
  etcExplain: string;

  @ManyToOne(() => Resume, (resume) => resume.certification)
  resume: Resume;
}

export default Certification;
