import { Column } from 'typeorm';
import { Primary } from './abstract';

abstract class Image extends Primary {
  @Column()
  path: string;

  @Column()
  volume: number;

  @Column()
  file_type: string;
}

export default Image;
