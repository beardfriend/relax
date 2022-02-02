import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { incorrectPassword, loginSuccess, noUser } from '@Constants/Messages';
import { findUser, tokenSign } from '@SH/Services/user/user';

interface Reqlogin {
  email: string;
  password: string;
}

async function login(req: Request, res: Response) {
  const { email, password }: Reqlogin = req.body;
  const user = await findUser(email);
  if (user === undefined) {
    return res.status(noUser.statusCode).json({ msg: noUser.message, category: noUser.category });
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res
      .status(incorrectPassword.statusCode)
      .json({ msg: incorrectPassword.message, category: incorrectPassword.category });
  }
  const token = tokenSign(email);
  res.cookie('login', token, { signed: true, maxAge: 10000, httpOnly: true });
  return res.status(loginSuccess.statusCode).json({ msg: loginSuccess.message, category: loginSuccess.category });
}

export default login;
