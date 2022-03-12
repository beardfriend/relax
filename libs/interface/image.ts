import { imageType } from '@Libs/constants/types';
import Resume from '@SH/Entities/resume/resume';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import { DeepPartial } from 'typeorm';

export declare module image {
  type data = {
    fileType: string;
    path: string;
    volume: number;
    category: imageType;
  };
  type key = {
    academyLogo?: DeepPartial<AcademyProfile>;
    academyIntroduce?: DeepPartial<AcademyProfile>;
    teacherProfile?: DeepPartial<TeacherProfile>;
    resume?: DeepPartial<Resume>;
  };
}

export interface imageData {
  data: {
    fileType: string;
    path: string;
    volume: number;
    category: imageType;
  };
  key?: {
    academyLogo?: DeepPartial<AcademyProfile>;
    academyIntroduce?: DeepPartial<AcademyProfile>;
    teacherProfile?: DeepPartial<TeacherProfile>;
    resume?: DeepPartial<Resume>;
  };
}
