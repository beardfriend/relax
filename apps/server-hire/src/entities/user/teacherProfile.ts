import { UpdateColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Teacher from './teacher';

@Entity()
class TeacherProfile extends UpdateColumn {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Teacher)
  @JoinColumn()
  user: Teacher;

  @OneToOne(() => Images)
  profile_image: Images;

  @OneToMany(() => Yoga, (yoga) => yoga.teacher)
  yoga: Yoga[];

  @Column({ nullable: true })
  introduce: string;
}

export default TeacherProfile;
