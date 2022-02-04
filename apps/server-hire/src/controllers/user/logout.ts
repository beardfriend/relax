import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function logout(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (cookies === undefined || process.env.JWT === undefined) {
    return res.status(500).send({ msg: '서버 장애' });
  }

  const splitedCookies = splitCookie(cookies);
  const loginToken = findCookieValue(splitedCookies, token.LOGIN);
  if (loginToken === false) {
    return res.status(500).send({ msg: '서버 장애' });
  }

  try {
    await jwt.verify(loginToken, process.env.JWT);
    res.cookie(token.LOGIN, '', { maxAge: 0, httpOnly: true });
    return res.send({ msg: '로그아웃 됨' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: '서버에서 서명한 토큰이 아닙니다.' });
  }
}

export default logout;
