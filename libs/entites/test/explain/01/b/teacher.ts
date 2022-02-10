import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Test_b_Resume from './resume';
import Test_b_Yoga from './yoga';

@Entity()
class Test_b_Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Test_b_Resume, (resume) => resume.teacher)
  resume: Test_b_Resume;

  @OneToMany(() => Test_b_Yoga, (yoga) => yoga.teacher)
  yoga: Test_b_Yoga[];
}

export default Test_b_Teacher;
