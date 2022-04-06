import { recruitType, yogaSortType } from '@Libs/constants/types';
import NormalCondition from '@SH/Entities/recruitment/normalCondition';
import RecruitTime from '@SH/Entities/recruitment/recruitTime';
import Academy from '@SH/Entities/user/academy';
import { DeepPartial } from 'typeorm';

export interface INormalCondition {
  time: DeepPartial<RecruitTime>[];
  yogaSort: yogaSortType;
  minCareer: number;
  pay: number;
}

export interface IRecruitTime {
  week?: string;
  date?: string;
  startTime: string;
  endTime: string;
}

export declare module IRecruitment {
  type normal = {
    type: recruitType;
    taskIntroduction: string;
    qualifications: string;
    privilegeList: string;
    normal: NormalCondition[];
  };
  type join = {
    writer: DeepPartial<Academy>;
  };
}
