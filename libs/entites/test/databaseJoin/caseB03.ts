import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Yoga from './caseA02';

@Entity()
class ProfileTwo {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @OneToMany(() => Yoga, (yoga) => yoga.id)
  yoga: Yoga[];
}

export default ProfileTwo;
