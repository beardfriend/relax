import { getMeSuccess } from '@Libs/constants/messages';
import { findUser } from '@SH/Services/user/user';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';

async function getMe(req: Request, res: Response) {
  const data = await findUser(req.user, req.type);
  const plainData = classToPlain(data, { groups: ['me'] });
  return res
    .status(getMeSuccess.statusCode)
    .send({ msg: getMeSuccess.message, category: getMeSuccess.category, data: plainData });
}

export default getMe;
