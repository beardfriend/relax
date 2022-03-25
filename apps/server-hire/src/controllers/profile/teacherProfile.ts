import {
  createTeacherProfileSuccess,
  getTeacherProfileSuccess,
  updateTeacherProfileSuccess,
} from '@Libs/constants/messages';
import { IteacherProfileRequest } from '@Libs/interface/teacher';
import {
  createTeacherProfile,
  findTeacherProfile,
  findTeacherProfileId,
  updateTeacherProfile,
} from '@SH/Services/profile/teacher';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';

export default async function putTeacherProfile(req: Request, res: Response) {
  const imageFile = req.files;

  const profileData = Object.assign(req.body, { TEACHER_PROFILE: imageFile }) as IteacherProfileRequest;
  const loginData = { uniqueKey: req.user, loginType: req.type };
  const findedProfile = await findTeacherProfileId(loginData);
  if (findedProfile === undefined) {
    await createTeacherProfile(profileData, loginData);
    return res
      .status(createTeacherProfileSuccess.statusCode)
      .send({ msg: createTeacherProfileSuccess.message, category: createTeacherProfileSuccess.category });
  }
  await updateTeacherProfile(profileData, loginData);
  return res
    .status(updateTeacherProfileSuccess.statusCode)
    .send({ msg: updateTeacherProfileSuccess.message, category: updateTeacherProfileSuccess.category });
}

export async function getTeacherProfile(req: Request, res: Response) {
  const profile = await findTeacherProfile({ uniqueKey: req.user, loginType: req.type });
  const datas = classToPlain(profile, { exposeUnsetFields: false, groups: ['me'] });

  return res.status(getTeacherProfileSuccess.statusCode).send({
    msg: getTeacherProfileSuccess.message,
    cateogry: getTeacherProfileSuccess.category,
    data: {
      email: datas.email,
      ...datas.teacher.teacherProfile,
    },
  });
}
