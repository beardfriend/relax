import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import token from '@Libs/constants/token';
import { normalMaxAge } from '@Libs/constants/constant';
import { signupSuccess, existEmail } from '@Constants/Messages';
import { createNormalUser, findUser, tokenSign } from '@SH/Services/user/user';

interface SignUpReq {
  email: string;
  password: string;
}

async function signUp(req: Request, res: Response) {
  const { email, password }: SignUpReq = req.body;
  const searchEmail = await findUser(email, 'normal');
  if (searchEmail !== undefined) {
    return res.status(existEmail.statusCode).json({ msg: existEmail.message, category: existEmail.category });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createNormalUser(email, hashedPassword);

  const signedEmail = await tokenSign(email);
  res.cookie(token.LOGIN, signedEmail, { maxAge: normalMaxAge, httpOnly: true });
  return res.status(signupSuccess.statusCode).json({ msg: signupSuccess.message, category: signupSuccess.category });
}

export default signUp;
