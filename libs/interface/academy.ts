import Image from '@Libs/entites/image';
import Address from '@SH/Entities/address';
import Yoga from '@SH/Entities/yoga/yoga';
import { Iaddress } from '@Libs/interface/address';
import { DeepPartial } from 'typeorm';

export declare module academyProfileType {
  type data = {
    academyName: string;
    representationNumber: string;
    introduce?: string;
  };
  type join = {
    address?: DeepPartial<Address>;
    yoga?: DeepPartial<Yoga>[];
    logo?: DeepPartial<Image>;
    introduceImage?: DeepPartial<Image>[];
  };
}

export interface IacademyProfileRequest extends Iaddress {
  academyName: string;
  representationNumber: string;
  introduce?: string | undefined;
  yoga?: string[] | string | undefined;
  ACADEMY_LOGO: Express.Multer.File[];
  ACADEMY_INTRODUCE: Express.Multer.File[];
  isDeleteLogo?: string;
}

export interface Iimages {
  [fieldname: string]: Express.Multer.File[];
}

export interface IbusinessInfoRequest {
  businessNumber: string;
  representationName: string;
  openDate: string;
}
