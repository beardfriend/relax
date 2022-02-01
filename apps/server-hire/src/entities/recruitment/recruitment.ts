import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { recruitmentStatus, recruitType } from '@Constants/Types';
import { Primary } from '@Libs/entites/abstract';
import InsteadCondition from './insteadCondition';
import NormalCondition from './normalCondition';
import Academy from '../user/academy';

@Entity()
class Recruitement extends Primary {
  @ManyToOne(() => Academy)
  writer: Academy;

  @Column({ type: 'enum', enum: recruitmentStatus, default: recruitmentStatus.DOING })
  status: recruitmentStatus;

  @Column({ type: 'enum', enum: recruitType })
  type: recruitType;

  @Column()
  task_introduction: string;

  @Column()
  qualifications: string;

  @Column()
  treat_list: string;

  @OneToMany(() => InsteadCondition, (insteadCondition) => insteadCondition.recruit)
  instead: InsteadCondition[];

  @OneToMany(() => NormalCondition, (normalCondition) => normalCondition.recruit)
  normal: NormalCondition[];
}
export default Recruitement;
