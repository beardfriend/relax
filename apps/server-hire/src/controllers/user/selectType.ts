import { Response, Request } from 'express';
import { findUser } from '@SH/Services/user/user';
import { getManager } from 'typeorm';
import { userType } from '@Libs/constants/types';

async function selectType(req: Request, res: Response) {
  if (req.user === undefined || req.type === undefined) {
    return res.status(500).send('token 정보값 undefined 에러');
  }
  const { selectedType } = req.params;
  const manager = getManager();

  const user = await findUser(req.user, req.type);

  if (user === undefined) {
    return res.status(500).send('유저 정보 없음');
  }

  user.role = selectedType as userType;
  manager.save(user);
  return res.send('hello');
}

export default selectType;
