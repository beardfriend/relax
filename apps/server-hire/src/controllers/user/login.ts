import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { incorrectPassword, loginSuccess, noUser } from '@Constants/Messages';
import { findUser } from '@SH/Services/user/user';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
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
  return res.status(loginSuccess.statusCode).json({ msg: loginSuccess.message, category: loginSuccess.category });
}

export default login;
