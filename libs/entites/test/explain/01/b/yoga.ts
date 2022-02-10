import { yogaSortType } from '@Libs/constants/types';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Test_b_Academy from './academy';
import Test_b_Teacher from './teacher';
// 일단 여기 테스트에서는 이력서, 채용공고는 제외하고, 회원 유형에 따른 key값만 넣어보자.
@Entity()
class Test_b_Yoga {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: yogaSortType })
  name: yogaSortType;

  @ManyToOne(() => Test_b_Teacher, (teacher) => teacher.yoga)
  teacher: Test_b_Teacher;

  @ManyToOne(() => Test_b_Academy, (academy) => academy.yoga)
  academy: Test_b_Academy;
}

export default Test_b_Yoga;
