import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Yoga from './caseA02';

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @OneToMany(() => Yoga, (yoga) => yoga.profile)
  yoga: Yoga[];
}

export default Profile;
