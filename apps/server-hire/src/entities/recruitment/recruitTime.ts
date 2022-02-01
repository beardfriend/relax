import { Primary } from '@Libs/entites/abstract';
import { Entity, Column, ManyToOne } from 'typeorm';
import InsteadCondition from './insteadCondition';
import NormalCondition from './normalCondition';

@Entity()
class RecruitTime extends Primary {
  @Column()
  week: string;

  @Column()
  date: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @ManyToOne(() => NormalCondition, (normalCondition) => normalCondition.time)
  noraml_condition: NormalCondition;

  @ManyToOne(() => InsteadCondition, (insteadCondition) => insteadCondition.time)
  instead_condition: InsteadCondition;
}

export default RecruitTime;
