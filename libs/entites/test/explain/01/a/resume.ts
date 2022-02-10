import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Test_a_Teacher from './teacher';

@Entity()
class Test_a_Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yoga: yogaSortType[];

  @OneToMany(() => Test_a_Teacher, (teacher) => teacher.resume)
  teacher: Test_a_Teacher[];
}

export default Test_a_Resume;
