import { profile, profileData } from '@Libs/interface/academy';
import { addressType } from '@Libs/interface/address';
import { image } from '@Libs/interface/image';
import { switchLoginType2, switchYogaType, switchYogaTypeReverse, swtichImageCategory } from '@Libs/utils/switch';
import Address from '@SH/Entities/address';
import Images from '@SH/Entities/image';
import Academy from '@SH/Entities/user/academy';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import User from '@SH/Entities/user/user';
import Yoga from '@SH/Entities/yoga/yoga';
import { DeepPartial, getManager, getRepository } from 'typeorm';
import createImage from '../image';
import createYoga, { deleteYoga } from '../yoga';

export async function createAndSaveAcademyProfile(stringData: profileData, findedAcademy: DeepPartial<Academy>) {
  const manager = getManager();

  const academyProfile = manager.create(AcademyProfile, {
    user: findedAcademy,
    academy_name: stringData.academyName,
    address: stringData.address,
    representation_number: stringData.representationNumber,
    introduce: stringData.introduce,
    yoga: stringData.yoga,
    introduce_image: stringData.introduceImage,
    logo: stringData.logo,
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
    .innerJoinAndSelect('academy.academy_profile', 'profile')
    .where(switchLoginType2(loginType), { uniqueKey })
    .andWhere('academy.academy_profile = profile.id')
    .getOne();
  return res;
}

export async function findAcademyProfile2(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'academy.id'])
    .innerJoin('user.academy', 'academy')
    .innerJoinAndSelect('academy.academy_profile', 'profile')
    .leftJoinAndSelect('profile.address', 'address')
    .leftJoinAndSelect('profile.logo', 'logo')
    .leftJoinAndSelect('profile.yoga', 'yoga')
    .leftJoinAndSelect('profile.introduce_image', 'image')
    .where(switchLoginType2(loginType), { uniqueKey })
    .getOne();
  if (res === undefined) {
    throw new Error('academyProfile not found');
  }
  return res;
}

export async function createYogaList(yoga: string[] | undefined, key?: DeepPartial<AcademyProfile>) {
  if (yoga === undefined) {
    return undefined;
  }
  // const yogaList: DeepPartial<Yoga>[] = [];
  const yogaList = await Promise.all(
    yoga.map((data) => {
      return createYoga(switchYogaType(data), key);
    })
  );
  return yogaList;
}

export async function updateYogaList(
  newYogaList: string[],
  beforeYogaList: DeepPartial<Yoga>[],
  academyProfile?: DeepPartial<AcademyProfile>
) {
  // 중복이 없으면, 전체 삭제 후 새로운 리스트 업데이트
  // 중복이 있으면, 중복된 것 남기고 나머지 지우고 새로운 것들 업데이트
  // 빈 값이면, 전체 삭제
  let yogaList = newYogaList;
  if (typeof newYogaList === 'string') {
    yogaList = [newYogaList];
  }
  if (newYogaList === undefined) {
    return;
  }

  const beforeList: string[] = [];

  const Deletelist = beforeYogaList.filter((yoga) => {
    if (yoga.name === undefined) {
      return undefined;
    }
    const yoganame = switchYogaTypeReverse(yoga.name) as string;
    beforeList.push(yoganame);
    return !yogaList.includes(yoganame);
  });

  const updateList = yogaList.filter((data) => {
    return !beforeList.includes(data);
  });

  Deletelist.map(async (data) => {
    if (data.id === undefined) {
      return;
    }
    await deleteYoga(data.id);
  });
  await createYogaList(updateList, academyProfile);
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
  data: profile.data,
  join?: profile.join
) {
  // 프로필 업데이트 다른 것들은 영향 끼치지 않고 하는 방법 연구.
  const manager = getManager();
  const academyProfile = findedProfile;
  academyProfile.academy_name = data.academyName;
  academyProfile.representation_number = data.representationNumber;
  academyProfile.introduce = data.introduce;
  academyProfile.yoga = join?.yoga;
  academyProfile.logo = join?.logo;
  academyProfile.introduce_image = join?.introduceImage;

  manager.save(academyProfile);
}

export async function updateAddress2(address: addressType, findedAddress: DeepPartial<Address>) {
  const { x, y, region_1_depth, region_2_depth, region_3_depth, road_name, main_building_no, sub_building_no } =
    address;
  const manager = getManager();
  const findaddress = findedAddress;
  findaddress.x = x;
  findaddress.y = y;
  findaddress.region_1_depth = region_1_depth;
  findaddress.region_2_depth = region_2_depth;
  findaddress.region_3_depth = region_3_depth;
  findaddress.road_name = road_name;
  findaddress.main_building_no = main_building_no;
  findaddress.sub_building_no = sub_building_no;
  await manager.save(findaddress);
}

export async function updateLogo(id: number, data: image.data) {
  const manager = getManager();
  await manager.update(
    Images,
    { id },
    { file_type: data.fileType, path: data.path, volume: data.volume, category: data.category }
  );
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
  await manager.update(
    Images,
    { academy_introduce: academyIntroduce },
    { file_type: data.fileType, path: data.path, volume: data.volume, category: data.category }
  );
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
    if (academyProfile.introduce_image?.length === 0) {
      await createIntroduce();
    }
    await academyProfile.introduce_image?.map(async (datas) => {
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

/** Logic */
export async function test() {
  return 'hello';
}
