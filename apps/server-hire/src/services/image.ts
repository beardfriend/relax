import Image from '@SH/Entities/image';
import { DeepPartial, getManager } from 'typeorm';
import { imageType } from '@Libs/constants/types';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import { image } from '@Libs/interface/image';

async function createImage(data: image.data, key?: image.key) {
  const manager = getManager();
  const images = manager.create(Image, {
    file_type: data.fileType,
    path: data.path,
    volume: data.volume,
    category: data.category,
    academy_logo: key?.academyLogo,
    academy_introduce: key?.academyIntroduce,
  });
  await manager.save(images);
  return images;
}

export async function createIntroduceImage(
  fileType: string,
  path: string,
  volume: number,
  category: imageType,
  academyIntroduce: DeepPartial<AcademyProfile>
) {
  const manager = getManager();
  const images = manager.create(Image, {
    file_type: fileType,
    path,
    volume,
    category,
    academy_introduce: academyIntroduce,
  });
  await manager.save(images);
  return images;
}

export default createImage;
