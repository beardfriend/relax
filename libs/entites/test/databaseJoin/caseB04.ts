import { yogaSortType } from '@Libs/constants/types';
import Profile from './caseA03';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class YogaProfile {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: 'enum', enum: yogaSortType })
  yoga_name: yogaSortType;

  @ManyToOne(() => Profile, (profile) => profile.id)
  resume: Profile;
}

export default YogaProfile;
