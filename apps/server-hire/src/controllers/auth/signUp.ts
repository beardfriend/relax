import { existEmail, signupSuccess } from '@Constants/Messages';
import { normalExpireIn, normalMaxAge } from '@Libs/constants/constant';
import token from '@Libs/constants/token';
import env from '@SH/env';
import jwt from 'jsonwebtoken';
import { findUser, createNormalUser } from '@SH/Services/user/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { InormalUser } from '@Libs/interface/user';

async function signUp(req: Request, res: Response) {
  const { email, password }: InormalUser = req.body;

  const user = await findUser(email, 'normal');

  if (user !== undefined) {
    return res.status(existEmail.statusCode).json({ msg: existEmail.message, category: existEmail.category });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createNormalUser(email, hashedPassword);

  const signedEmail = await jwt.sign({ email, type: 'normal' }, env.jwt, { expiresIn: normalExpireIn });
  res.cookie(token.LOGIN, signedEmail, { maxAge: normalMaxAge, httpOnly: true });

  return res.status(signupSuccess.statusCode).json({ msg: signupSuccess.message, category: signupSuccess.category });
}

export default signUp;
