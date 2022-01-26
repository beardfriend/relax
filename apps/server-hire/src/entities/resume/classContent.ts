import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import WorkExperience from './workExperience';

@Entity()
class ClassContent {
  @ManyToOne(() => WorkExperience, (workExperience) => workExperience.class_content)
  @PrimaryGeneratedColumn()
  work_experience: WorkExperience;

  @Column({ type: 'enum', enum: yogaSortType })
  yoga_name: yogaSortType;

  @Column()
  running_time: string;
}

export default ClassContent;
