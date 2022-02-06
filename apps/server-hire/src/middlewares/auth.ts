import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { verfiyError, envError, accessRefreshNotFound } from '@Constants/Messages';
import token from '@Libs/constants/token';
import { kakao_token_update } from '@Libs/api/kakao';

const JWTKEY = process.env.JWT;

export async function verfiyToken(req: Request, res: Response, next: NextFunction) {
  const { relaxLogin } = await req.cookies;

  if (JWTKEY === undefined) {
    res.status(500).send({ msg: '서버 장애' });
    return;
  }

  const isOurToken = await jwt.verify(relaxLogin, JWTKEY);
  if (isOurToken) {
    next({ msg: isOurToken });
  }
  next();
}

export async function tokenCheck(req: Request, res: Response, next: NextFunction) {
  const { relaxLogin } = await req.cookies;
  if (JWTKEY === undefined) {
    res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
    return;
  }
  const isOurToken = await jwt.verify(relaxLogin, JWTKEY);
  if (isOurToken) {
    next({ msg: isOurToken });
  }
  next();
}

export async function loginCheckMiddleWare(req: Request, res: Response, next: NextFunction) {
  const cookies = req.headers.cookie;
  if (process.env.JWT === undefined || process.env.KAKAO_KEY === undefined) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }
  if (cookies === undefined) {
    // 리다이렉트 로그인 페이지
    return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
  }

  const splitedCookies = splitCookie(cookies);
  const accessToken = findCookieValue(splitedCookies, token.LOGIN);
  const refreshToken = findCookieValue(splitedCookies, token.RefreshKakao);
  if (accessToken === false) {
    if (refreshToken === false) {
      return res
        .status(accessRefreshNotFound.statusCode)
        .send({ msg: accessRefreshNotFound.message, category: accessRefreshNotFound.category });
    }
    const verifyRefreshToken = await jwt.verify(refreshToken, process.env.JWT);

    if (typeof verifyRefreshToken === 'string') {
      return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
    }

    const updateResult = await kakao_token_update({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_KEY,
      refresh_token: verifyRefreshToken.refresh_token,
    });

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token, expires_in, refresh_token, refresh_token_expires_in } = updateResult.data;

    const signedAccessToken = await jwt.sign({ access_token, type: 'kakao' }, process.env.JWT, {
      expiresIn: expires_in,
    });

    res.cookie(token.LOGIN, signedAccessToken, { maxAge: expires_in * 1000, httpOnly: true });

    if (refresh_token !== undefined && refresh_token_expires_in !== undefined) {
      const signedRefreshToken = await jwt.sign({ refresh_token, type: 'kakao' }, process.env.JWT, {
        expiresIn: refresh_token_expires_in,
      });
      res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refresh_token_expires_in, httpOnly: true });
    }
    return next();
  }
  const verifyAccessToken = await jwt.verify(accessToken, process.env.JWT);

  if (typeof verifyAccessToken === 'string') {
    return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
  }
  req.type = verifyAccessToken.type;
  if (verifyAccessToken.type === 'normal') {
    req.user = verifyAccessToken.email;
  } else if (verifyAccessToken.type === 'kakao') {
    req.user = verifyAccessToken.kakao_id;
  }

  return next();
}
