import { academyProfileType, profileData } from '@Libs/interface/academy';
import { addressType } from '@Libs/interface/address';
import { image } from '@Libs/interface/image';
import { switchLoginType2, swtichImageCategory } from '@Libs/utils/switch';
import Address from '@SH/Entities/address';
import Images from '@SH/Entities/image';
import Academy from '@SH/Entities/user/academy';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager, getRepository } from 'typeorm';
import createImage from '../image';

export async function createAndSaveAcademyProfile(stringData: profileData, findedAcademy: DeepPartial<Academy>) {
  const manager = getManager();
  const academyProfile = manager.create(AcademyProfile, {
    ...stringData,
    user: findedAcademy,
  });
  try {
    await manager.save(academyProfile);
    return academyProfile;
  } catch (error) {
    console.log(error);
    throw new Error('hello');
  }
}

export async function findAcademyProfile(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.academy', 'academy')
    .innerJoinAndSelect('academy.academyProfile', 'profile')
    .where(switchLoginType2(loginType), { uniqueKey })
    .andWhere('academy.academyProfile = profile.id')
    .getOne();
  return res;
}

export async function findAcademyProfile2(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'academy.id'])
    .innerJoin('user.academy', 'academy')
    .innerJoinAndSelect('academy.academyProfile', 'profile')
    .leftJoinAndSelect('profile.address', 'address')
    .leftJoinAndSelect('profile.logo', 'logo')
    .leftJoinAndSelect('profile.yoga', 'yoga')
    .leftJoinAndSelect('profile.introduceImage', 'image')
    .where(switchLoginType2(loginType), { uniqueKey })
    .getOne();
  if (res === undefined) {
    throw new Error('academyProfile not found');
  }
  return res;
}

export async function getAcademyProfile(id: number) {
  const acadmeyRepo = await getRepository(AcademyProfile);
  const res = await acadmeyRepo.findOne({ where: { id }, relations: ['yoga'] });

  return res;
}

export async function updateAddress(id: number, address: addressType) {
  if (address === undefined) {
    return;
  }
  const manager = getManager();
  await manager.update(
    Address,
    { id },
    {
      ...address,
    }
  );
}

export async function updateProfile(
  findedProfile: DeepPartial<AcademyProfile>,
  data: academyProfileType.data,
  join?: academyProfileType.join
) {
  // 프로필 업데이트 다른 것들은 영향 끼치지 않고 하는 방법 연구.
  const manager = getManager();
  const academyProfile = findedProfile;

  academyProfile.academyName = data.academyName;
  academyProfile.representationNumber = data.representationNumber;
  academyProfile.introduce = data.introduce;
  academyProfile.yoga = join?.yoga;
  academyProfile.logo = join?.logo;
  academyProfile.introduceImage = join?.introduceImage;

  await manager.save(academyProfile);
}

export async function updateLogo(id: number, data: image.data) {
  const manager = getManager();
  await manager.update(Images, { id }, { ...data });
}

async function createLogo(ACADEMY_LOGO: Express.Multer.File[]) {
  const { fieldname, mimetype, path, size } = ACADEMY_LOGO[0];
  const logo = await createImage({
    fileType: mimetype,
    path,
    volume: size,
    category: swtichImageCategory(fieldname),
  });
  return logo;
}

export async function updateIntroduceImage(academyIntroduce: DeepPartial<AcademyProfile>, data: image.data) {
  const manager = getManager();
  await manager.update(Images, { academy_introduce: academyIntroduce }, { ...data });
}

export async function logoIntroduceImage(images: { [fieldname: string]: Express.Multer.File[] }) {
  const { ACADEMY_LOGO, ACADEMY_INTRODUCE } = images;

  const isLogo = ACADEMY_LOGO === undefined ? 'No' : 'Yes';
  const isIntroduce = ACADEMY_INTRODUCE === undefined ? 'No' : 'Yes';

  async function createIntroduce() {
    const academyIntroudceImage: DeepPartial<Images>[] = [];
    ACADEMY_INTRODUCE.map(async (data) => {
      const { fieldname, mimetype, path, size } = data;
      const createdImage = await createImage({
        fileType: mimetype,
        path,
        volume: size,
        category: swtichImageCategory(fieldname),
      });
      academyIntroudceImage.push(createdImage);
    });
    return academyIntroudceImage;
  }

  if (isLogo === 'Yes' && isIntroduce === 'Yes') {
    const introduceImage = await createIntroduce();
    const logo = await createLogo(ACADEMY_LOGO);
    return { introduceImage, logo };
  }
  if (isLogo === 'No' && isIntroduce === 'Yes') {
    const introduceImage = await createIntroduce();
    return { introduceImage, undefined };
  }
  if (isLogo === 'Yes' && isIntroduce === 'No') {
    const logo = await createLogo(ACADEMY_LOGO);
    return { undefined, logo };
  }
  return { undefined };
}

export async function deleteIntroduceImage(id: number) {
  const manager = getManager();
  await manager.delete(Images, { id });
}

export async function updateLogoIntroudceImage2(
  images: { [fieldname: string]: Express.Multer.File[] },
  academyProfile: DeepPartial<AcademyProfile>
) {
  const { ACADEMY_LOGO, ACADEMY_INTRODUCE } = images;
  const isLogo = ACADEMY_LOGO === undefined ? 'No' : 'Yes';
  const isIntroduce = ACADEMY_INTRODUCE === undefined ? 'No' : 'Yes';

  async function createIntroduce() {
    ACADEMY_INTRODUCE.map(async (data) => {
      const { fieldname, mimetype, path, size } = data;
      await createImage(
        {
          fileType: mimetype,
          path,
          volume: size,
          category: swtichImageCategory(fieldname),
        },
        { academyIntroduce: academyProfile }
      );
    });
  }
  async function createUpdateLogo() {
    if (academyProfile.logo === null) {
      const createdLogo = await createLogo(ACADEMY_LOGO);
      const manager = getManager();
      await manager.update(AcademyProfile, { id: academyProfile.id }, { logo: createdLogo });
    } else {
      if (academyProfile.logo === undefined) {
        return;
      }
      if (academyProfile.logo.id === undefined) {
        return;
      }
      await updateLogo(academyProfile.logo.id, {
        category: swtichImageCategory(ACADEMY_LOGO[0].fieldname),
        fileType: ACADEMY_LOGO[0].mimetype,
        path: ACADEMY_LOGO[0].path,
        volume: ACADEMY_LOGO[0].size,
      });
    }
  }

  async function createUpdateIntroduceImage() {
    if (academyProfile.introduceImage?.length === 0) {
      await createIntroduce();
    }
    await academyProfile.introduceImage?.map(async (datas) => {
      if (datas?.id === undefined) {
        return;
      }

      await deleteIntroduceImage(datas?.id);
    });

    await createIntroduce();
  }
  if (isLogo === 'Yes' && isIntroduce === 'Yes') {
    await createUpdateIntroduceImage();
    await createUpdateLogo();
  }
  if (isLogo === 'No' && isIntroduce === 'Yes') {
    await createUpdateIntroduceImage();
  }
  if (isLogo === 'Yes' && isIntroduce === 'No') {
    await createUpdateLogo();
  }
}

export async function generateAcademyProfile() {}

/** Logic */
export async function test() {
  return 'hello';
}
