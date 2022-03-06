// @ts-nocheck
import { Response, Request } from 'express';
import { profileData } from '@Libs/interface/academy';
import createAddress from '@SH/Services/address';
import { createAcademyProfile, logoIntroduceImage } from '@SH/Services/user/academy';
import createYoga from '@SH/Services/yoga';
import { academyProfileSuccess, academyProfileFail } from '@Constants/Messages';
import { switchYogaType } from '@Libs/utils/switch';

export default async function academyProfile(req: Request, res: Response) {
  const images = req.files as { [fieldname: string]: Express.Multer.File[] };

  const { academyName, introduce, address, representationNumber, yogaType }: profileData = JSON.parse(req.body.data);
  if (academyName === undefined || representationNumber === undefined) {
    return res
      .status(academyProfileFail.statusCode)
      .send({ msg: academyProfileFail.message, category: academyProfileFail.category });
  }
  const { introduceImage, logo } = await logoIntroduceImage(images);
  const createdAddress = await createAddress(address);
  const createdYoga = await createYoga(switchYogaType(yogaType));
  await createAcademyProfile(
    '',
    academyName,
    createdAddress,
    introduce,
    representationNumber,
    [createdYoga],
    logo,
    introduceImage
  );
  return res
    .status(academyProfileSuccess.statusCode)
    .send({ msg: academyProfileSuccess.message, category: academyProfileSuccess.category });
}
