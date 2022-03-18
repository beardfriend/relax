import { UpdateColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Teacher from './teacher';

@Entity()
class TeacherProfile extends UpdateColumn {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  introduce: string;

  @Column()
  instagram: string;

  @OneToOne(() => Images)
  profileImage: Images;

  @OneToMany(() => Yoga, (yoga) => yoga.teacher)
  yoga: Yoga[];

  @OneToOne(() => Teacher)
  @JoinColumn()
  user: Teacher;
}

export default TeacherProfile;
