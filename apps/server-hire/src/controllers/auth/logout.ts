import { logoutSuccess, serverError, tokenNotfound } from '@Constants/Messages';
import token from '@Libs/constants/token';
import env from '@SH/env';
import { checkAccessToken } from '@SH/Services/common/token';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function logout(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  const accessToken = checkAccessToken(cookies);

  if (!accessToken) {
    return res.status(tokenNotfound.statusCode).send({ msg: tokenNotfound.message, category: tokenNotfound.category });
  }

  try {
    await jwt.verify(accessToken, env.jwt);

    res.cookie(token.LOGIN, '', { maxAge: 0, httpOnly: true });

    return res.status(logoutSuccess.statusCode).send({ msg: logoutSuccess.message, category: logoutSuccess.category });
  } catch (error) {
    console.log(error);
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}

export default logout;
