import Yoga from '@SH/Entities/yoga/yoga';
import { DeepPartial } from 'typeorm';
import Image from '@Libs/entites/image';
import { yogaSortTypeEnglish } from '@Libs/constants/types';

export declare module teacherProfileType {
  type data = {
    name: string;
    introduce?: string;
    instagram?: string;
  };
  type join = {
    yoga?: DeepPartial<Yoga>[];
    profileImage?: DeepPartial<Image>;
  };
}

export interface IteacherProfileRequest {
  name: string;
  introduce?: string;
  instagram?: string;
  yoga?: yogaSortTypeEnglish[] | yogaSortTypeEnglish;
  TEACHER_PROFILE: Express.Multer.File[];
  isDeleteProfileImage: string | undefined;
}
