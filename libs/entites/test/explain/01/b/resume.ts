import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Test_b_Teacher from './teacher';

@Entity()
class Test_b_Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Test_b_Teacher, (teacher) => teacher.resume)
  teacher: Test_b_Teacher[];
}

export default Test_b_Resume;
