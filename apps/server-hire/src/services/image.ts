import Image from '@SH/Entities/image';
import { getManager } from 'typeorm';
import { imageType } from '@Libs/constants/types';

async function createImage(fileType: string, path: string, volume: number, category: imageType) {
  const manager = getManager();
  const image = manager.create(Image, {
    file_type: fileType,
    path,
    volume,
    category,
  });
  await manager.save(image);
  return image;
}

export default createImage;
