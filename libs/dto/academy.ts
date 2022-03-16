import { Exclude, Expose, Type } from 'class-transformer';

export class AcademyProfileDto {
  @Exclude()
  id: number;

  @Expose()
  academyName: string;

  @Expose()
  representationNumber: string;

  @Expose()
  introduce: string;
}

export class AcademyDto {
  @Exclude()
  id: number;

  @Expose()
  @Type(() => AcademyProfileDto)
  academyProfile: AcademyProfileDto;
}
