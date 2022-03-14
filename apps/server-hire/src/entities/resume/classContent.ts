import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import WorkExperience from './workExperience';

@Entity()
class ClassContent {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => WorkExperience, (workExperience) => workExperience.classContent)
  workExperience: WorkExperience;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];

  @Column()
  runningTime: number;
}

export default ClassContent;
