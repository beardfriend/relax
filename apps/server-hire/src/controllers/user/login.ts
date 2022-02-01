import { Request, Response } from 'express';
import { findUser } from '@SH/Services/user/user';
import { getManager } from 'typeorm';

async function login(req: Request, res: Response) {
  const { email } = req.body;
  const manager = await getManager();
  const findMail = findUser(manager, email);
  console.log(findMail);
  res.send({ msg: 'hello' });
}

export default login;
