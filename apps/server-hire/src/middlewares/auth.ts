/* eslint-disable @typescript-eslint/naming-convention */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { verfiyError, envError } from '@Constants/Messages';
import { userType } from '@Libs/constants/types';

import token from '@Libs/constants/token';
import { kakao_token_update } from '@Libs/api/kakao';
import { findUser } from '@SH/Services/user/user';

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
  let needVerfiyToken = null;

  if (accessToken === false) {
    if (refreshToken === false) {
      return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
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
    const verifyAccessToken = await jwt.verify(access_token, process.env.JWT);
    if (typeof verifyAccessToken === 'string') {
      return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
    }
    needVerfiyToken = access_token;
  }

  const verifyAccessToken = await jwt.verify(needVerfiyToken === null ? accessToken : needVerfiyToken, process.env.JWT);

  if (typeof verifyAccessToken === 'string') {
    return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
  }
  req.type = verifyAccessToken.type;
  if (verifyAccessToken.type === 'normal') {
    req.user = verifyAccessToken.email;
  } else if (verifyAccessToken.type === 'kakao') {
    req.user = verifyAccessToken.kakao_id;
  } else if (verifyAccessToken.type === 'google') {
    req.user = verifyAccessToken.google_id;
  }
  return next();
}

export async function onlyTeacherAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user === undefined || req.type === undefined) {
    return res.send('login check middleware error');
  }

  const user = await findUser(req.user, req.type);
  if (user?.role === userType.TEACHER) {
    return next();
  }
  return res.status(403).send('접근 금지');
}

export async function onlyAcademyAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user === undefined || req.type === undefined) {
    return res.send('login check middleware error');
  }

  const user = await findUser(req.user, req.type);
  if (user?.role === userType.ACADEMY) {
    return next();
  }
  return res.status(403).send('접근 금지');
}
