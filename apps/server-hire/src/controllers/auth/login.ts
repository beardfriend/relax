import { envError, incorrectPassword, loginSuccess, noUser } from '@Constants/Messages';
import { normalExpireIn, normalMaxAge } from '@Libs/constants/constant';
import token from '@Libs/constants/token';
import { findUser } from '@SH/Services/user/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '@SH/env';
import { Request, Response } from 'express';
import { normalUser } from '@Libs/interface/user';

async function login(req: Request, res: Response) {
  const { email, password }: normalUser = req.body;
  const user = await findUser(email, 'normal');
  if (user === undefined) {
    return res.status(noUser.statusCode).json({ msg: noUser.message, category: noUser.category });
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res
      .status(incorrectPassword.statusCode)
      .json({ msg: incorrectPassword.message, category: incorrectPassword.category });
  }
  const signedToken = await jwt.sign({ email, type: 'normal' }, env.jwt, { expiresIn: normalExpireIn });

  if (!signedToken) {
    return res.status(envError.statusCode).send({ category: envError.category, msg: envError.message });
  }
  res.cookie(token.LOGIN, signedToken, { maxAge: normalMaxAge, httpOnly: true });
  return res.status(loginSuccess.statusCode).json({ msg: loginSuccess.message, category: loginSuccess.category });
}

export default login;
