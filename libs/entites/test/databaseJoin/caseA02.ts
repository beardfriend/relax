import { yogaSortType } from '@Libs/constants/types';
import Resume from './caseA01';
import Profile from './caseA03';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Yoga {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: 'enum', enum: yogaSortType })
  yoga_name: yogaSortType;

  @ManyToOne(() => Resume, (resume) => resume.yoga, { nullable: true })
  resume?: Resume;

  @ManyToOne(() => Profile, (profile) => profile.yoga, { nullable: true })
  profile?: Profile;
}

export default Yoga;
