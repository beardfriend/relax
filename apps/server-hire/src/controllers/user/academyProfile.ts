import { Response, Request } from 'express';
import { profileData } from '@Libs/interface/academy';
import createAddress from '@SH/Services/address';
import { createAcademyProfile, logoIntroduceImage } from '@SH/Services/user/academy';
import createYoga from '@SH/Services/yoga';
// import createImage from '@SH/Services/image';
import { yogaSortType } from '@Libs/constants/types';

function switchYogaType(key: string) {
  switch (key) {
    case 'IYENGAR':
      return yogaSortType.IYENGAR;
    case 'HATA':
      return yogaSortType.HATA;
    case 'ASHTANGA':
      return yogaSortType.ASHTANGA;
    case 'FLYING':
      return yogaSortType.FLYING;
    default:
      throw new Error('존재하지 않는 타입입니다.');
  }
}

export default async function academyProfile(req: Request, res: Response) {
  const images = req.files as { [fieldname: string]: Express.Multer.File[] };

  const { academyName, introduce, address, representationNumber, yogaType }: profileData = JSON.parse(req.body.data);
  const { introduceImage, logo } = await logoIntroduceImage(images);
  const createdAddress = await createAddress(address);
  const createdYoga = await createYoga(switchYogaType(yogaType));
  await createAcademyProfile(
    academyName,
    createdAddress,
    introduce,
    representationNumber,
    [createdYoga],
    logo,
    introduceImage
  );
  return res.status(200).send('성공적으로 프로필 등록이 완료되었습니다.');
}
