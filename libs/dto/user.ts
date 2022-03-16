import { signUpType, userType } from '@Libs/constants/types';
import { PrimaryTest } from '@Libs/entites/abstract';
import Academy from '@SH/Entities/user/academy';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AcademyDto } from './academy';

export class UserDto extends PrimaryTest {
  @Expose()
  kakaoId: number;

  @Expose()
  googleId: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  password: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  role: userType;

  @Expose()
  signupType: signUpType;

  @Type(() => AcademyDto)
  academy: Academy;
}
