import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { verfiyError } from '@Constants/Messages';
import { userType } from '@Libs/constants/types';
import { env } from '@Libs/utils/env';
import token from '@Libs/constants/token';
import { kakao_token_update } from '@Libs/api/kakao';
import { findUser } from '@SH/Services/user/user';

export async function loginCheckMiddleWare(req: Request, res: Response, next: NextFunction) {
  const cookies = req.headers.cookie;

  if (cookies === undefined) {
    return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
  }

  const splitedCookies = splitCookie(cookies);
  const accessToken = findCookieValue(splitedCookies, token.LOGIN);
  const refreshToken = findCookieValue(splitedCookies, token.RefreshKakao);
  let needVerfiyToken = null;
  try {
    if (accessToken === false) {
      if (refreshToken === false) {
        return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
      }

      const verifyRefreshToken = await jwt.verify(refreshToken, env.jwt);

      if (typeof verifyRefreshToken === 'string') {
        return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
      }

      const updateResult = await kakao_token_update({
        grant_type: 'refresh_token',
        client_id: env.kakao.key,
        refresh_token: verifyRefreshToken.refresh_token,
      });

      const { access_token, expires_in, refresh_token, refresh_token_expires_in } = updateResult.data;

      const signedAccessToken = await jwt.sign({ access_token, type: 'kakao' }, env.jwt, {
        expiresIn: expires_in,
      });

      res.cookie(token.LOGIN, signedAccessToken, { maxAge: expires_in * 1000, httpOnly: true });

      if (refresh_token !== undefined && refresh_token_expires_in !== undefined) {
        const signedRefreshToken = await jwt.sign({ refresh_token, type: 'kakao' }, env.jwt, {
          expiresIn: refresh_token_expires_in,
        });
        res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refresh_token_expires_in, httpOnly: true });
      }
      const verifyAccessToken = await jwt.verify(access_token, env.jwt);
      if (typeof verifyAccessToken === 'string') {
        return res.status(verfiyError.statusCode).send({ msg: verfiyError.message, category: verfiyError.category });
      }
      needVerfiyToken = access_token;
    }

    const verifyAccessToken = await jwt.verify(needVerfiyToken === null ? accessToken : needVerfiyToken, env.jwt);

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
  } catch (error) {
    console.log(error);
    throw new Error('Login MiddleWare Error');
  }
}

export async function onlyTeacherAccess(req: Request, res: Response, next: NextFunction) {
  const user = await findUser(req.user, req.type);
  if (user?.role === userType.TEACHER) {
    return next();
  }
  return res.status(403).send('접근 금지');
}

export async function onlyAcademyAccess(req: Request, res: Response, next: NextFunction) {
  const user = await findUser(req.user, req.type);
  if (user?.role === userType.ACADEMY) {
    return next();
  }
  return res.status(403).send('접근 금지');
}
