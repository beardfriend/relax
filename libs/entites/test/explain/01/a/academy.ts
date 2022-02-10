import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Test_a_Recruit from './recruit';

@Entity()
class Test_a_Academy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yoga: yogaSortType[];

  @ManyToOne(() => Test_a_Recruit, (recruit) => recruit.academy)
  recruit: Test_a_Recruit;
}

export default Test_a_Academy;
