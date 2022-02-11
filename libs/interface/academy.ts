import { yogaSortType } from '@Libs/constants/types';
import { addressType } from './address';

export interface profileData {
  academyName: string;
  representationNumber: string;
  introduce: string;
  yogaType: yogaSortType;
  address: addressType;
}
