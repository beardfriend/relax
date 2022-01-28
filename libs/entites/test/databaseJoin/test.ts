import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { yogaSortType } from '@Libs/constants/types';

@Entity()
class ResumeTree {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];
}

export default ResumeTree;
