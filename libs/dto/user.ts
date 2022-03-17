import { signUpType, userType } from '@Libs/constants/types';
import { Primary } from '@Libs/entites/abstract';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AcademyDto } from './academy';

export class UserDto extends Primary {
  @Expose({ groups: ['me'] })
  kakaoId: number;

  @Expose({ groups: ['me'] })
  googleId: string;

  @Expose({ groups: ['signup', 'login'] })
  @IsNotEmpty()
  email: string;

  @Expose({ groups: ['signup', 'login'] })
  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  password: string;

  @Expose({ groups: ['me'] })
  phoneNumber: string;

  @Expose({ groups: ['me'] })
  role: userType;

  @Expose({ groups: ['me'] })
  signupType: signUpType;

  @Type(() => AcademyDto)
  academy: AcademyDto;
}
