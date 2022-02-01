import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { yogaSortType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import RecruitTime from './recruitTime';
import Recruitement from './recruitment';

@Entity()
class NormalCondition extends Primary {
  @OneToMany(() => RecruitTime, (recruitTime) => recruitTime.week)
  time: RecruitTime[];

  @Column({ type: 'enum', enum: yogaSortType })
  yogaSort: yogaSortType;

  @Column()
  min_career: number;

  @Column()
  pay: number;

  @ManyToOne(() => Recruitement, (recruitment) => recruitment.normal)
  recruit: Recruitement;
}
export default NormalCondition;