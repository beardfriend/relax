import { requestTokenNotfound, profileGetSuccess, userInfoNotfound } from '@Libs/constants/messages';
import { Response, Request } from 'express';
import { findTeacher } from '@SH/Services/profile/teacher';
import { findUser } from '@SH/Services/user/user';

export default async function getTeacherProfile(req: Request, res: Response) {
  if (req.user === undefined || req.type === undefined) {
    return res
      .status(requestTokenNotfound.statusCode)
      .send({ msg: requestTokenNotfound.message, category: requestTokenNotfound.category });
  }

  const user = await findUser(req.user, req.type);
  if (user === undefined) {
    return res
      .status(userInfoNotfound.statusCode)
      .send({ msg: userInfoNotfound.message, category: userInfoNotfound.category });
  }

  const teacherProfile = await findTeacher(user.id);
  const { email, phone_number, teacher_profile } = teacherProfile[0];

  return res.status(profileGetSuccess.statusCode).send({
    data: { email, phone_number, introduce: teacher_profile.introduce },
    msg: profileGetSuccess.message,
    category: profileGetSuccess.category,
  });
}
