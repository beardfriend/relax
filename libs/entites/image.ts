import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';
import { Primary } from './abstract';

abstract class Image extends Primary {
  @Column()
  path: string;

  @Column()
  @Exclude()
  volume: number;

  @Column()
  @Exclude()
  file_type: string;
}

export default Image;
