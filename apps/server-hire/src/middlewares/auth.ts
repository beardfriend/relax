import { accessRefreshNotFound, cookieNotFound } from '@Constants/Messages';
import token from '@Libs/constants/token';
import { userType } from '@Libs/constants/types';
import {
  getAccessRefreshToken,
  getSignedAccessRefreshToken,
  isLoginStatusFunc,
  setUserInfo,
} from '@SH/Services/common/middlewares';
import { findUser } from '@SH/Services/user/user';
import { NextFunction, Request, Response } from 'express';

export async function loginCheckMiddleWare(req: Request, res: Response, next: NextFunction) {
  const cookies = req.headers.cookie;

  if (cookies === undefined) {
    return res
      .status(cookieNotFound.statusCode)
      .send({ msg: cookieNotFound.message, category: cookieNotFound.category });
  }

  const { accessToken, refreshToken } = getAccessRefreshToken(cookies);

  const [status, accessOrRefreshToken] = isLoginStatusFunc({ accessToken, refreshToken });

  let needVerifyToken = accessOrRefreshToken;

  try {
    if (status === 'loginFail') {
      return res
        .status(accessRefreshNotFound.statusCode)
        .send({ msg: accessRefreshNotFound.message, category: accessRefreshNotFound.category });
    }

    if (status === 'getKakaoAccess') {
      const { accessTokenInfo, refreshToeknInfo } = await getSignedAccessRefreshToken(accessOrRefreshToken);

      res.cookie(token.LOGIN, accessTokenInfo.signedAccessToken, {
        maxAge: accessTokenInfo.expiresIn * 1000,
        httpOnly: true,
      });

      if (refreshToeknInfo !== undefined) {
        res.cookie(token.RefreshKakao, refreshToeknInfo.signedRefreshToken, {
          maxAge: refreshToeknInfo.refreshExpiresIn * 1000,
          httpOnly: true,
        });
      }

      needVerifyToken = accessTokenInfo.signedAccessToken;
    }
    const [type, user] = await setUserInfo(needVerifyToken);
    req.type = type;
    req.user = user;
    return next();
  } catch (error) {
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
