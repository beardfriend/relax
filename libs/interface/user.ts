import Academy from '@SH/Entities/user/academy';
import Teacher from '@SH/Entities/user/teacher';
import { DeepPartial } from 'typeorm';

export interface InormalUser {
  email: string;
  password: string;
}

export declare module userKey {
  type uniqueKey = string | number;
  type loginType = 'normal' | 'kakao' | 'google';
}

export interface updateUserData {
  academy?: DeepPartial<Academy>;
  teacher?: DeepPartial<Teacher>;
  password?: string;
}

export interface userInfo {
  phoneNumber: string;
}

export interface IloginData {
  loginType: 'normal' | 'kakao' | 'google';
  uniqueKey: string | number;
}
