import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import { resumeApplyStatus } from '@Libs/constants/types';
import RecruitTime from './recruitment/recruitTime';
import Resume from './resume/resume';

@Entity()
class ResumeApplyList extends Primary {
  @Column({ type: 'enum', enum: resumeApplyStatus })
  status: resumeApplyStatus;

  @ManyToOne(() => Resume)
  resume: Resume;

  @ManyToOne(() => RecruitTime)
  recruit: RecruitTime;
}

export default ResumeApplyList;
