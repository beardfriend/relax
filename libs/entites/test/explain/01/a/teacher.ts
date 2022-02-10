import { yogaSortType } from '@Libs/constants/types/yogaSort';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Test_a_Resume from './resume';

@Entity()
class Test_a_Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yoga: yogaSortType[];

  @ManyToOne(() => Test_a_Resume, (resume) => resume.teacher)
  resume: Test_a_Resume;
}

export default Test_a_Teacher;
