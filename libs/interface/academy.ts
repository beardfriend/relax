import Image from '@Libs/entites/image';
import Address from '@SH/Entities/address';
import Yoga from '@SH/Entities/yoga/yoga';
import { DeepPartial } from 'typeorm';

export declare module profile {
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
  businessNumber: string;
  representationName: string;
  openDate: string;
}

export interface profileImage {}
