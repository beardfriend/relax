import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Yoga from './caseA02';

@Entity()
class Resume {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @OneToMany(() => Yoga, (yoga) => yoga.resume)
  yoga: Yoga[];
}

export default Resume;
