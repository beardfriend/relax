import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { logoutSuccess, verfiyError, cookieNotFound, tokenNotfound } from '@Constants/Messages';
import env from '@SH/env';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function logout(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (cookies === undefined) {
    return res
      .status(cookieNotFound.statusCode)
      .send({ msg: cookieNotFound.message, category: cookieNotFound.category });
  }

  const splitedCookies = splitCookie(cookies);
  const loginToken = findCookieValue(splitedCookies, token.LOGIN);
  if (loginToken === undefined) {
    return res.status(tokenNotfound.statusCode).send({ msg: tokenNotfound.message, category: tokenNotfound.category });
  }

  try {
    await jwt.verify(loginToken, env.jwt);
    res.cookie(token.LOGIN, '', { maxAge: 0, httpOnly: true });
    return res.status(logoutSuccess.statusCode).send({ msg: logoutSuccess.message, category: logoutSuccess.category });
  } catch (error) {
    console.log(error);
    return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
  }
}

export default logout;
