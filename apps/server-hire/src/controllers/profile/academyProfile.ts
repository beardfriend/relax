import { createProfileSuccess, getProfileSuccess, updateProfileSuccess } from '@Constants/Messages';
import Academy from '@SH/Entities/user/academy';
import createAddress from '@SH/Services/address';
import {
  createAndSaveAcademyProfile,
  createYogaList,
  findAcademyProfile,
  findAcademyProfile2,
  logoIntroduceImage,
  updateAddress,
  updateLogoIntroudceImage2,
  updateProfile,
  updateYogaList,
} from '@SH/Services/profile/academy';
import { findAcademy } from '@SH/Services/user/academy';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default async function academyProfile(req: Request, res: Response) {
  const images = req.files as { [fieldname: string]: Express.Multer.File[] };
  const {
    academyName,
    introduce,
    representationNumber,
    yoga,
    x,
    y,
    region1Depth,
    region2Depth,
    region3Depth,
    roadName,
    mainBuildingNo,
    subBuildingNo,
  } = req.body;
  const manager = getManager();
  try {
    const findedProfile = await findAcademyProfile(req.user, req.type);

    const address = {
      x: Number(x),
      y: Number(y),
      region1Depth,
      region2Depth,
      region3Depth,
      roadName,
      mainBuildingNo,
      subBuildingNo,
    };

    if (findedProfile === undefined) {
      const findedAcademy = await findAcademy(req.user, req.type);
      const { logo, introduceImage } = await logoIntroduceImage(images);
      const yogaList = await createYogaList(yoga);
      const createdAddress = await createAddress(address);
      const profile = await createAndSaveAcademyProfile(
        { academyName, representationNumber, introduce, logo, introduceImage, yoga: yogaList, address: createdAddress },
        findedAcademy.academy
      );
      await manager.update(Academy, { id: findedAcademy.id }, { academyProfile: profile });
      return res
        .status(createProfileSuccess.statusCode)
        .send({ cateogry: createProfileSuccess.category, msg: createProfileSuccess.message });
    }

    const findedProfileAllInfo = await findAcademyProfile2(req.user, req.type);

    const profile = findedProfileAllInfo.academy.academyProfile;

    await updateAddress(profile.address.id, address);
    await updateYogaList(yoga, profile.yoga, profile);
    await updateLogoIntroudceImage2(images, profile);
    await updateProfile(profile, { academyName, representationNumber, introduce });
    return res
      .status(updateProfileSuccess.statusCode)
      .send({ msg: updateProfileSuccess.message, category: updateProfileSuccess.category });
  } catch (error) {
    console.log(error);
    return res.status(500).send('error');
  }
}

export async function academyProfileGet(req: Request, res: Response) {
  const profile = await findAcademyProfile2(req.user, req.body);
  const datas = classToPlain(profile, { exposeUnsetFields: false });
  console.log(datas);
  const address = profile.academy.academyProfile.address.getFullAddress();
  const profileData = datas.academy.academyProfile;

  return res.status(getProfileSuccess.statusCode).send({
    category: getProfileSuccess.category,
    msg: getProfileSuccess.message,
    data: {
      ...profileData,
      address,
    },
  });
}
