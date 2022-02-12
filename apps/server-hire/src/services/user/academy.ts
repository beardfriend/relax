import { DeepPartial, getManager } from 'typeorm';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import Yoga from '@SH/Entities/yoga/yoga';
import AcademyBusiness from '@SH/Entities/user/academyBusiness';
import Academy from '@SH/Entities/user/academy';
import User from '@SH/Entities/user/user';
import Images from '@SH/Entities/image';
import { imageType } from '@Libs/constants/types';
import createImage from '../image';

function swtichImageCategory(key: string) {
  switch (key) {
    case 'ACADEMY_LOGO':
      return imageType.ACADEMY_LOGO;
    case 'TEACHER_PROFILE':
      return imageType.TEACEHR_PROFILE;
    case 'ACADEMY_INTRODUCE':
      return imageType.ACADEMY_INTRODUCE;
    case 'RESUME_INTROUDCE':
      return imageType.RESUME_INTROUDCE;
    default:
      throw new Error('존재하지 않는 타입입니다.');
  }
}

export async function createAcademyProfile(
  academyName: string,
  address: {},
  introduce: string,
  representationNumber: string,
  yoga: DeepPartial<Yoga>[],
  logo: DeepPartial<Images> | undefined,
  introudceImage: DeepPartial<Images>[] | undefined
) {
  const manager = getManager();
  const academyProfile = manager.create(AcademyProfile, {
    academy_name: academyName,
    address,
    introduce,
    representation_number: representationNumber,
    yoga,
    logo,
    introduce_image: introudceImage,
  });
  await manager.save(academyProfile);
  return academyProfile;
}

export async function createAcademyBusiness(businessNumber: string, representationName: string, openDate: string) {
  const manager = getManager();
  const academyBusiness = manager.create(AcademyBusiness, {
    bussiness_number: businessNumber,
    representation_name: representationName,
    open_date: openDate,
  });
  await manager.save(academyBusiness);
  return academyBusiness;
}

export async function createAcademy(business: DeepPartial<AcademyBusiness>, user: DeepPartial<User>) {
  const manager = getManager();
  const academy = manager.create(Academy, {
    business,
    id: user,
  });
  await manager.save(academy);
  return academy;
}

export async function logoIntroduceImage(images: { [fieldname: string]: Express.Multer.File[] }) {
  const { ACADEMY_LOGO, ACADEMY_INTRODUCE } = images;

  const isLogo = ACADEMY_LOGO === undefined ? 'No' : 'Yes';
  const isIntroduce = ACADEMY_INTRODUCE === undefined ? 'No' : 'Yes';

  async function createIntroduce() {
    const academyIntroudceImage: DeepPartial<Images>[] = [];
    ACADEMY_INTRODUCE.map(async (data) => {
      const { fieldname, mimetype, path, size } = data;
      const image = await createImage(mimetype, path, size, swtichImageCategory(fieldname));
      academyIntroudceImage.push(image);
    });
    return academyIntroudceImage;
  }

  async function createLogo() {
    const { fieldname, mimetype, path, size } = ACADEMY_LOGO[0];
    const logo = await createImage(mimetype, path, size, swtichImageCategory(fieldname));
    return logo;
  }

  if (isLogo === 'Yes' && isIntroduce === 'Yes') {
    const introduceImage = await createIntroduce();
    const logo = await createLogo();
    return { introduceImage, logo };
  }
  if (isLogo === 'No' && isIntroduce === 'Yes') {
    const introduceImage = await createIntroduce();
    return { introduceImage, undefined };
  }
  if (isLogo === 'Yes' && isIntroduce === 'No') {
    const logo = await createLogo();
    return { undefined, logo };
  }
  return { undefined };
}
