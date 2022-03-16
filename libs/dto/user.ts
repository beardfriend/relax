import { Exclude, Expose, Type } from 'class-transformer';
import { PrimaryDto } from './abstract';
import { AcademyDto } from './academy';

export class UserDto extends PrimaryDto {
  @Exclude()
  password: string;

  @Expose()
  @Type(() => AcademyDto)
  academy: AcademyDto;
}
