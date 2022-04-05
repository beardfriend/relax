import { createProfileSuccess, getProfileSuccess, updateProfileSuccess } from '@Constants/Messages';
import { IacademyProfileRequest, Iimages } from '@Libs/interface/academy';
import {
  createAcademyProfile,
  findAcademyProfile,
  findAcademyProfileId,
  updateAcademyProfile,
} from '@SH/Services/profile/academy';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';

export default async function putAcademyProfile(req: Request, res: Response) {
  const images = req.files as Iimages;

  const profileData = Object.assign(req.body, images) as IacademyProfileRequest;
  const loginData = { uniqueKey: req.user, loginType: req.type };

  const findedProfile = await findAcademyProfileId(loginData);

  if (findedProfile === undefined) {
    await createAcademyProfile(profileData, loginData);
    return res
      .status(createProfileSuccess.statusCode)
      .send({ msg: createProfileSuccess.message, category: createProfileSuccess.category });
  }

  await updateAcademyProfile(profileData, loginData);
  return res
    .status(updateProfileSuccess.statusCode)
    .send({ msg: updateProfileSuccess.message, category: updateProfileSuccess.category });
}

export async function getAcademyProfile(req: Request, res: Response) {
  const profile = await findAcademyProfile(req.user, req.type);
  const datas = classToPlain(profile, { exposeUnsetFields: false });

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
