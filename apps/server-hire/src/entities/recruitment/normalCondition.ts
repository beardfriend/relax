import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { yogaSortType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import RecruitTime from './recruitTime';
import Recruitment from './recruitment';

@Entity()
class NormalCondition extends Primary {
  @OneToMany(() => RecruitTime, (recruitTime) => recruitTime.noramlCondition)
  time: RecruitTime[];

  @Column({ type: 'enum', enum: yogaSortType })
  yogaSort: yogaSortType;

  @Column()
  minCareer: number;

  @Column()
  pay: number;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.normal)
  recruit: Recruitment;
}
export default NormalCondition;
