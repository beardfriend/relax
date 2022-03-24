import { Primary, UpdateColumn } from '@Libs/entites/abstract';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AcademyProfileDto extends UpdateColumn {
  @Exclude()
  id: number;

  @Expose()
  @IsNotEmpty()
  academyName: string;

  @Expose()
  @IsNotEmpty()
  representationNumber: string;

  @Expose()
  introduce: string;
}

export class AcadmeyBusinessDto extends Primary {
  @Expose()
  @IsNotEmpty()
  businessNumber: string;

  @Expose()
  @IsNotEmpty()
  representationName: string;

  @Expose()
  @IsNotEmpty()
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

export class AcademyProfilePostDto extends AcademyProfileDto {
  @Expose()
  yoga: string[] | string;

  @Expose()
  @IsNotEmpty()
  region1Depth: string;

  @Expose()
  @IsNotEmpty()
  region2Depth: string;

  @Expose()
  @IsNotEmpty()
  region3Depth: string;

  @Expose()
  @IsNotEmpty()
  roadName: string;

  @Expose()
  @IsNotEmpty()
  mainBuildingNo: string;

  @Expose()
  @IsNotEmpty()
  subBuildingNo: string;
}
