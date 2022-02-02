import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getManager } from 'typeorm';
import User from '@SH/Entities/user/user';
import { signupSuccess, existEmail } from '@Constants/Messages';
import { findUser, tokenSign } from '@SH/Services/user/user';

interface SignUpReq {
  email: string;
  password: string;
}

async function signUp(req: Request, res: Response) {
  const { email, password }: SignUpReq = req.body;
  const searchEmail = await findUser(email);
  if (searchEmail !== undefined) {
    return res.status(existEmail.statusCode).json({ msg: existEmail.message, category: existEmail.category });
  }

  const manager = await getManager();
  const user = new User();
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  await manager.save(user);

  const token = tokenSign(email);
  res.cookie('relaxLogin', token, { signed: true, maxAge: 10000, httpOnly: true });
  return res.status(signupSuccess.statusCode).json({ msg: signupSuccess.message, category: signupSuccess.category });
}

export default signUp;
