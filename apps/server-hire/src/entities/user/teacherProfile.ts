import { yogaSortType } from '@Libs/constants/types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Images from '../image';
import User from './user';

@Entity()
class TeacherProfile {
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Images)
  @JoinColumn()
  logo: Images;

  @Column({ type: 'enum', enum: yogaSortType, array: true })
  yogaType: yogaSortType[];

  @Column()
  introduce: string;
}

export default TeacherProfile;
