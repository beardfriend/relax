import { academyProfileType, IacademyProfileRequest } from '@Libs/interface/academy';
import { Iaddress } from '@Libs/interface/address';
import { image } from '@Libs/interface/image';
import { IloginData } from '@Libs/interface/user';
import { dataCompareFunc } from '@Libs/utils/converter';
import { switchLoginType2, swtichImageCategory } from '@Libs/utils/switch';
import Address from '@SH/Entities/address';
import Images from '@SH/Entities/image';
import Academy from '@SH/Entities/user/academy';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager, getRepository } from 'typeorm';
import createAddress from '../address';
import createImage from '../image';
import { findAcademy } from '../user/academy';
import { createYogaList, updateYogaList } from '../yoga';

/* ***************
 * Find  *
 *************** */

export async function findAcademyProfileId(loginData: IloginData) {
  const { loginType, uniqueKey } = loginData;
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'academy.id', 'profile.id'])
    .innerJoin('user.academy', 'academy')
    .innerJoin('academy.academyProfile', 'profile')
    .where(switchLoginType2(loginType), { uniqueKey })
    .andWhere('academy.academyProfile = profile.id')
    .getOne();
  return res;
}

export async function findAcademyProfile(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
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

/* ***************
 * Create  *
 *************** */

export async function createAndSaveAcademyProfile(
  data: academyProfileType.data & academyProfileType.join,
  findedAcademy: DeepPartial<Academy>
): Promise<AcademyProfile> {
  const manager = getManager();
  const academyProfile = manager.create(AcademyProfile, {
    ...data,
    user: findedAcademy,
  });
  try {
    await manager.save(academyProfile);
    return academyProfile;
  } catch (error) {
    console.log(error);
    throw new Error('database error');
  }
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

async function createIntroduce(
  type: 'create' | 'update',
  ACADEMY_INTRODUCE: Express.Multer.File[],
  academyProfile?: DeepPartial<AcademyProfile>
) {
  const academyIntroudceImage: DeepPartial<Images>[] = [];
  ACADEMY_INTRODUCE.map(async (data) => {
    const { fieldname, mimetype, path, size } = data;
    const createdImage = await createImage(
      {
        fileType: mimetype,
        path,
        volume: size,
        category: swtichImageCategory(fieldname),
      },
      { academyIntroduce: academyProfile }
    );
    if (type === 'create') {
      academyIntroudceImage.push(createdImage);
    }
  });
  return academyIntroudceImage;
}

/* ***************
 * Update  *
 *************** */

export async function updateProfile(profile: DeepPartial<AcademyProfile>, data: academyProfileType.data) {
  const profileRepo = getRepository(AcademyProfile);
  const newData = dataCompareFunc(profile, data);

  if (!newData) {
    return;
  }
  await profileRepo.update({ id: profile.id }, newData);
}

export async function updateAddress(profile: DeepPartial<AcademyProfile>, data: Iaddress) {
  if (profile.address === undefined) {
    return;
  }
  const addressRepo = getRepository(Address);
  const newData = dataCompareFunc(profile.address, data);
  if (!newData) {
    return;
  }
  await addressRepo.update({ id: profile.address?.id }, newData);
}

export async function updateLogo(id: number | undefined, data: image.data) {
  const manager = getManager();
  await manager.update(Images, { id }, { ...data });
}

export async function updateProfileLogoId(id: number | undefined, createdLogo: DeepPartial<Images>) {
  const academyProfileRepo = getRepository(AcademyProfile);
  await academyProfileRepo.update({ id }, { logo: createdLogo });
}

export async function updateAcademyId(id: number | undefined, academyProfile: DeepPartial<AcademyProfile>) {
  const academyRepo = getRepository(Academy);
  await academyRepo.update({ id }, { academyProfile });
}

/* ***************
 * Delete  *
 *************** */

export async function deleteIntroduceImageById(id: number) {
  const manager = getManager();
  await manager.delete(Images, { id });
}

export async function deleteLogoImage(academyProfile: DeepPartial<AcademyProfile>) {
  const manager = getManager();
  await manager.createQueryBuilder().relation(AcademyProfile, 'logo').of(academyProfile.id).set(Images);
  await manager.delete(Images, { id: academyProfile.logo?.id });
}

export async function deleteIntroduceImageByFK(academyProfile: DeepPartial<AcademyProfile>) {
  const imageRepo = getRepository(Images);
  await imageRepo.delete({ academyIntroduce: academyProfile });
}

/* ***************
 * Middle Logic *
 *************** */

export async function createLogoIntroduceImage(images: { [fieldname: string]: Express.Multer.File[] }) {
  const { ACADEMY_LOGO, ACADEMY_INTRODUCE } = images;

  const isLogo = ACADEMY_LOGO === undefined ? 'No' : 'Yes';
  const isIntroduce = ACADEMY_INTRODUCE === undefined ? 'No' : 'Yes';

  if (isLogo === 'Yes' && isIntroduce === 'Yes') {
    const introduceImage = await createIntroduce('create', ACADEMY_INTRODUCE);
    const logo = await createLogo(ACADEMY_LOGO);
    return { introduceImage, logo };
  }
  if (isLogo === 'No' && isIntroduce === 'Yes') {
    const introduceImage = await createIntroduce('create', ACADEMY_INTRODUCE);
    return { introduceImage, undefined };
  }
  if (isLogo === 'Yes' && isIntroduce === 'No') {
    const logo = await createLogo(ACADEMY_LOGO);
    return { undefined, logo };
  }
  return { undefined };
}

export async function updateLogoLogic(
  ACADEMY_LOGO: Express.Multer.File[],
  academyProfile: DeepPartial<AcademyProfile>
) {
  if (ACADEMY_LOGO.length === 0) {
    return;
  }

  if (academyProfile.logo === null) {
    const createdLogo = await createLogo(ACADEMY_LOGO);
    await updateProfileLogoId(academyProfile?.id, createdLogo);
  } else {
    await updateLogo(academyProfile.logo?.id, {
      category: swtichImageCategory(ACADEMY_LOGO[0].fieldname),
      fileType: ACADEMY_LOGO[0].mimetype,
      path: ACADEMY_LOGO[0].path,
      volume: ACADEMY_LOGO[0].size,
    });
  }
}

export async function updateIntroduceLogic(
  ACADEMY_INTRODUCE: Express.Multer.File[],
  academyProfile: DeepPartial<AcademyProfile>
) {
  if (academyProfile.introduceImage?.length === 0) {
    await createIntroduce('update', ACADEMY_INTRODUCE, academyProfile);
    return;
  }
  await academyProfile.introduceImage?.map(async (datas) => {
    if (datas?.id === undefined) {
      return;
    }
    await deleteIntroduceImageById(datas?.id);
  });
  await createIntroduce('update', ACADEMY_INTRODUCE, academyProfile);
}

export async function updateLogoIntroudceImage(
  images: { [fieldname: string]: Express.Multer.File[] },
  isDeleteLogo: string | undefined,
  academyProfile: DeepPartial<AcademyProfile>
): Promise<void> {
  const { ACADEMY_LOGO, ACADEMY_INTRODUCE } = images;

  const isLogo = ACADEMY_LOGO === undefined ? 'No' : 'Yes';
  const isIntroduce = ACADEMY_INTRODUCE === undefined ? 'No' : 'Yes';

  if (isLogo === 'Yes' && isIntroduce === 'Yes') {
    await updateIntroduceLogic(ACADEMY_INTRODUCE, academyProfile);
    await updateLogoLogic(ACADEMY_LOGO, academyProfile);
  }
  if (isLogo === 'No' && isIntroduce === 'Yes') {
    await updateIntroduceLogic(ACADEMY_INTRODUCE, academyProfile);
  }
  if (isLogo === 'Yes' && isIntroduce === 'No') {
    await updateLogoLogic(ACADEMY_LOGO, academyProfile);
  }
  if (isLogo === 'No' && isIntroduce === 'No') {
    if (isDeleteLogo === 'true') {
      await deleteLogoImage(academyProfile);
    }
  }
}

/* ***************
 * Final Logic *
 *************** */

export async function createAcademyProfile(data: IacademyProfileRequest, loginData: IloginData): Promise<void> {
  const { ACADEMY_INTRODUCE, ACADEMY_LOGO, academyName, representationNumber, introduce, yoga } = data;
  const { region1Depth, region2Depth, region3Depth, roadName, mainBuildingNo, subBuildingNo } = data;
  const address = { region1Depth, region2Depth, region3Depth, roadName, mainBuildingNo, subBuildingNo };
  const imagesData = { ACADEMY_INTRODUCE, ACADEMY_LOGO };

  const findedAcademy = await findAcademy(loginData);
  const { logo, introduceImage } = await createLogoIntroduceImage(imagesData);
  const yogaList = await createYogaList(yoga);
  const createdAddress = await createAddress(address);
  const profile = await createAndSaveAcademyProfile(
    { academyName, representationNumber, introduce, logo, introduceImage, yoga: yogaList, address: createdAddress },
    findedAcademy.academy
  );
  await updateAcademyId(findedAcademy.id, profile);
}

export async function updateAcademyProfile(data: IacademyProfileRequest, loginData: IloginData): Promise<void> {
  const { uniqueKey, loginType } = loginData;
  const { ACADEMY_INTRODUCE, ACADEMY_LOGO, academyName, representationNumber, introduce, yoga, isDeleteLogo } = data;
  const { region1Depth, region2Depth, region3Depth, roadName, mainBuildingNo, subBuildingNo } = data;
  const address = { region1Depth, region2Depth, region3Depth, roadName, mainBuildingNo, subBuildingNo };
  const imagesData = { ACADEMY_INTRODUCE, ACADEMY_LOGO };
  const findedProfileAllInfo = await findAcademyProfile(uniqueKey, loginType);

  const profile = findedProfileAllInfo.academy.academyProfile;
  await updateAddress(profile, address);
  await updateYogaList(yoga, profile.yoga, profile);
  await updateLogoIntroudceImage(imagesData, isDeleteLogo, profile);
  await updateProfile(profile, { academyName, representationNumber, introduce });
}
