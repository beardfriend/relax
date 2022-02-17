import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { envError, logoutSuccess, verfiyError, cookieNotFound, tokenNotfound } from '@Constants/Messages';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function logout(req: Request, res: Response) {
  const cookies = req.headers.cookie;
  if (process.env.JWT === undefined) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }
  if (cookies === undefined) {
    return res
      .status(cookieNotFound.statusCode)
      .send({ msg: cookieNotFound.message, category: cookieNotFound.category });
  }

  const splitedCookies = splitCookie(cookies);
  const loginToken = findCookieValue(splitedCookies, token.LOGIN);
  if (loginToken === false) {
    return res.status(tokenNotfound.statusCode).send({ msg: tokenNotfound.message, category: tokenNotfound.category });
  }

  try {
    await jwt.verify(loginToken, process.env.JWT);
    res.cookie(token.LOGIN, '', { maxAge: 0, httpOnly: true });
    return res.status(logoutSuccess.statusCode).send({ msg: logoutSuccess.message, category: logoutSuccess.category });
  } catch (error) {
    console.log(error);
    return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
  }
}

export default logout;
