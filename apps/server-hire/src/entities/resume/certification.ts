import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Primary } from '@Libs/entites/abstract';
import Resume from './resume';

@Entity()
class Certification extends Primary {
  @Column()
  agency_name: string;

  @Column()
  class_start: string;

  @Column()
  class_end: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];

  @Column()
  etc_explain: string;

  @ManyToOne(() => Resume)
  resume: Resume;
}

export default Certification;
