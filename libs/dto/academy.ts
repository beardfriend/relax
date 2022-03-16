import { PrimaryTest, UpdateColumn } from '@Libs/entites/abstract';
import { Exclude, Expose, Type } from 'class-transformer';

export class AcademyProfileDto extends UpdateColumn {
  @Exclude()
  id: number;

  @Expose()
  academyName: string;

  @Expose()
  representationNumber: string;

  @Expose()
  introduce: string;
}

export class AcadmeyBusinessDto extends PrimaryTest {
  @Expose()
  businessNumber: number;

  @Expose()
  representationName: string;

  @Expose()
  openDate: string;
}

export class AcademyDto extends UpdateColumn {
  @Exclude()
  id: number;

  @Type(() => AcademyProfileDto)
  academyProfile: AcademyProfileDto;

  @Type(() => AcadmeyBusinessDto)
  businessInfo: AcadmeyBusinessDto;
}
