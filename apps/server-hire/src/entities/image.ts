import Image from '@Libs/entites/image';
import { Column, Entity } from 'typeorm';
import { imageType } from '@Constants/Types';

@Entity()
class Images extends Image {
  @Column({ type: 'enum', enum: imageType })
  category: imageType;
}

export default Images;
