import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Test_b_Recruit from './recruit';
import Test_b_Yoga from './yoga';

@Entity()
class Test_b_Academy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Test_b_Recruit, (recruit) => recruit.academy)
  recruit: Test_b_Recruit;

  @OneToMany(() => Test_b_Yoga, (yoga) => yoga.academy)
  yoga: Test_b_Yoga[];
}

export default Test_b_Academy;
