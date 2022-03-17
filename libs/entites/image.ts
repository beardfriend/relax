import { ImageDto } from '@Libs/dto/image';
import { Column } from 'typeorm';
import { Primary } from './abstract';

abstract class Image extends ImageDto implements Primary {
  @Column()
  path: string;

  @Column()
  volume: number;

  @Column()
  fileType: string;
}

export default Image;
