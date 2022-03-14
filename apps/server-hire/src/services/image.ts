import { image } from '@Libs/interface/image';
import Image from '@SH/Entities/image';
import { getManager } from 'typeorm';

async function createImage(data: image.data, key?: image.key) {
  const manager = getManager();
  const images = manager.create(Image, {
    ...data,
    academyLogo: key?.academyLogo,
    academyIntroduce: key?.academyIntroduce,
  });
  await manager.save(images);
  return images;
}

export default createImage;
