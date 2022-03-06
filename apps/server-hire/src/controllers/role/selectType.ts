import { userInfoNotfound, userTypeSelect } from '@Constants/Messages';
import updateRole from '@SH/Services/role/role';
import { findUser } from '@SH/Services/user/user';
import { Request, Response } from 'express';

async function selectRole(req: Request, res: Response) {
  const { role } = req.body;

  const findedUser = await findUser(req.user, req.type);

  if (findedUser === undefined) {
    return res
      .status(userInfoNotfound.statusCode)
      .send({ msg: userInfoNotfound.message, category: userInfoNotfound.category });
  }
  await updateRole(findedUser, role);

  return res.status(userTypeSelect.statusCode).send({ msg: userTypeSelect.message, category: userTypeSelect.category });
}

export default selectRole;
