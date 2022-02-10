import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Test_b_Academy from './academy';

@Entity()
class Test_b_Recruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Test_b_Academy, (academy) => academy.recruit)
  academy: Test_b_Academy[];
}

export default Test_b_Recruit;
