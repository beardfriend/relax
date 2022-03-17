import { Primary } from '@Libs/entites/abstract';
import { Exclude, Expose } from 'class-transformer';

export class ImageDto extends Primary {
  @Expose()
  path: string;

  @Expose()
  @Exclude()
  volume: number;

  @Expose()
  @Exclude()
  fileType: string;
}
