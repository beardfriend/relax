import { PrimaryJoinColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Teacher from './teacher';

@Entity()
class TeacherProfile extends PrimaryJoinColumn {
  @OneToOne(() => Teacher, { cascade: true })
  @JoinColumn({ name: 'id' })
  user: Teacher;

  @OneToOne(() => Images, { nullable: true })
  @JoinColumn()
  profile_image: Images;

  @OneToMany(() => Yoga, (yoga) => yoga.teacher, { nullable: true })
  yoga: Yoga[];

  @Column({ nullable: true })
  introduce: string;
}

export default TeacherProfile;
