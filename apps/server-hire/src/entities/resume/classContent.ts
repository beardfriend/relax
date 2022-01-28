import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import WorkExperience from './workExperience';

@Entity()
class ClassContent {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => WorkExperience, (workExperience) => workExperience.class_content)
  work_experience: WorkExperience;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];

  @Column()
  running_time: number;
}

export default ClassContent;
