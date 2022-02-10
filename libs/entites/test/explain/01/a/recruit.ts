import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Test_a_Academy from './academy';

@Entity()
class Test_a_Recruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yoga: yogaSortType[];

  @OneToMany(() => Test_a_Academy, (academy) => academy.recruit)
  academy: Test_a_Academy[];
}

export default Test_a_Recruit;
