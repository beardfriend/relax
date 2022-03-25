import { TeacherProfileDto } from '@Libs/dto/teacher';
import { UpdateColumn } from '@Libs/entites/abstract';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Images from '../image';
import Yoga from '../yoga/yoga';
import Teacher from './teacher';

@Entity()
class TeacherProfile extends TeacherProfileDto implements UpdateColumn {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  introduce: string;

  @Column({ nullable: true })
  instagram: string;

  @OneToOne(() => Images)
  @JoinColumn()
  profileImage: Images;

  @OneToMany(() => Yoga, (yoga) => yoga.teacher)
  yoga: Yoga[];

  @OneToOne(() => Teacher, { cascade: true })
  @JoinColumn({ name: 'id' })
  user: Teacher;
}

export default TeacherProfile;
