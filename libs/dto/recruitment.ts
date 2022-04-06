import { Expose, Type } from 'class-transformer';

export class RecruitTimeDto {
  @Expose()
  week: string;

  @Expose()
  date: string;

  @Expose()
  startTime: string;

  @Expose()
  endTime: string;
}

export class NormalConditionDto {
  @Expose()
  @Type(() => RecruitTimeDto)
  time: RecruitTimeDto[];

  @Expose()
  yogaSort: string;

  @Expose()
  minCareer: number;

  @Expose()
  pay: number;
}

export class RecruitmentDto {
  @Expose()
  taskIntroduction: string;

  @Expose()
  qualifications: string;

  @Expose()
  privilegeList: string;

  @Expose()
  @Type(() => NormalConditionDto)
  normal: NormalConditionDto[];
}
