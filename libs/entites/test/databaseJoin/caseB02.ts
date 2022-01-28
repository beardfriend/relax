import { yogaSortType } from '@Libs/constants/types';
import Resume from './caseA01';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class YogaResume {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: 'enum', enum: yogaSortType })
  yoga_name: yogaSortType;

  @ManyToOne(() => Resume, (resume) => resume.id)
  resume: Resume;
}

export default YogaResume;
