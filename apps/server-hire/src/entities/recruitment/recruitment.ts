import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { recruitmentStatus, recruitType } from '@Constants/Types';
import { Primary } from '@Libs/entites/abstract';
import InsteadCondition from './insteadCondition';
import NormalCondition from './normalCondition';
import Academy from '../user/academy';
import ResumeApplyList from '../resumeApplyList';

@Entity()
class Recruitement extends Primary {
  @ManyToOne(() => Academy, (academy) => academy.recruitement)
  writer: Academy;

  @Column({ type: 'enum', enum: recruitmentStatus, default: recruitmentStatus.DOING })
  status: recruitmentStatus;

  @Column({ type: 'enum', enum: recruitType })
  type: recruitType;

  @Column()
  taskIntroduction: string;

  @Column()
  qualifications: string;

  @Column()
  treatList: string;

  @OneToMany(() => ResumeApplyList, (applyList) => applyList.recruit)
  applyList: ResumeApplyList[];

  @OneToMany(() => InsteadCondition, (insteadCondition) => insteadCondition.recruit)
  instead: InsteadCondition[];

  @OneToMany(() => NormalCondition, (normalCondition) => normalCondition.recruit)
  normal: NormalCondition[];
}
export default Recruitement;
