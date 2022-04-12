import { Primary } from '@Libs/entites/abstract';
import { Entity, Column, ManyToOne } from 'typeorm';

import InsteadCondition from './insteadCondition';
import NormalCondition from './normalCondition';

@Entity()
class RecruitTime extends Primary {
  @Column({ nullable: true })
  week: string;

  @Column({ nullable: true })
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => NormalCondition, (normalCondition) => normalCondition.time, { onDelete: 'CASCADE' })
  noramlCondition: NormalCondition;

  @ManyToOne(() => InsteadCondition, (insteadCondition) => insteadCondition.time)
  insteadCondition: InsteadCondition;
}

export default RecruitTime;
