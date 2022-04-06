import { Primary } from '@Libs/entites/abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import { resumeApplyStatus } from '@Libs/constants/types';
import Resume from './resume/resume';
import Recruitment from './recruitment/recruitment';

@Entity()
class ResumeApplyList extends Primary {
  @Column({ type: 'enum', enum: resumeApplyStatus })
  status: resumeApplyStatus;

  @ManyToOne(() => Resume, (resume) => resume.resumeApplyList)
  resume: Resume;

  @ManyToOne(() => Recruitment, (recruit) => recruit.applyList)
  recruit: Recruitment;
}

export default ResumeApplyList;
