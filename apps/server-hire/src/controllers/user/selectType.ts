import { Response, Request } from 'express';
import { findUser } from '@SH/Services/user/user';
import { requestTokenNotfound, userInfoNotfound, userTypeSelect } from '@Constants/Messages';
import { getManager } from 'typeorm';
import { userType } from '@Libs/constants/types';

async function selectType(req: Request, res: Response) {
  if (req.user === undefined || req.type === undefined) {
    return res
      .status(requestTokenNotfound.statusCode)
      .send({ msg: requestTokenNotfound.message, category: requestTokenNotfound.category });
  }
  const { role } = req.body;

  const manager = getManager();

  const user = await findUser(req.user, req.type);

  if (user === undefined) {
    return res
      .status(userInfoNotfound.statusCode)
      .send({ msg: userInfoNotfound.message, category: userInfoNotfound.category });
  }
  if (role === 'ACADEMY') {
    user.role = userType.ACADEMY;
  } else if (role === 'TEACHER') {
    user.role = userType.TEACHER;
  }

  manager.save(user);
  return res.status(userTypeSelect.statusCode).send({ msg: userTypeSelect.message, category: userTypeSelect.category });
}

export default selectType;
