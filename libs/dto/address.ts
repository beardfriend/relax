import { Primary } from '@Libs/entites/abstract';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AddressDto extends Primary {
  @Expose()
  @IsNotEmpty()
  x: number;

  @Expose()
  @IsNotEmpty()
  y: number;

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
