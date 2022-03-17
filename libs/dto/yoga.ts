import { Primary } from '@Libs/entites/abstract';
import { Expose } from 'class-transformer';

export class YogaDto extends Primary {
  @Expose()
  name: string;
}
