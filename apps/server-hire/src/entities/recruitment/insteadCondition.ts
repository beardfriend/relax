import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { yogaSortType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import RecruitTime from './recruitTime';
import Recruitment from './recruitment';

@Entity()
class InsteadCondition extends Primary {
  @OneToMany(() => RecruitTime, (recruitTime) => recruitTime.insteadCondition)
  time: RecruitTime[];

  @Column({ type: 'enum', enum: yogaSortType })
  yogaSort: yogaSortType;

  @Column()
  minCareer: number;

  @Column()
  pay: number;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.instead)
  recruit: Recruitment;
}

export default InsteadCondition;
