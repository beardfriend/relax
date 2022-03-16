import Image from '@Libs/entites/image';
import Address from '@SH/Entities/address';
import Yoga from '@SH/Entities/yoga/yoga';
import { DeepPartial } from 'typeorm';

export declare module academyProfileType {
  type data = {
    academyName: string;
    representationNumber: string;
    introduce?: string;
    yoga?: string[] | string;
  };
  type join = {
    address?: DeepPartial<Address>;
    yoga?: DeepPartial<Yoga>[];
    logo?: DeepPartial<Image>;
    introduceImage?: DeepPartial<Image>[];
  };
}
export interface profileData {
  academyName: string;
  representationNumber: string;
  introduce?: string;
  address?: DeepPartial<Address>;
  yoga?: DeepPartial<Yoga>[];
  logo?: DeepPartial<Image>;
  introduceImage?: DeepPartial<Image>[];
}

export interface businessInfoData {
  businessNumber: number;
  representationName: string;
  openDate: string;
}
