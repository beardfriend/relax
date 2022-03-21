import { redirectLoginPage, serverError } from '@Libs/constants/messages';
import token from '@Libs/constants/token';
import { userType } from '@Libs/constants/types';
import { getSignedAccessRefreshToken, loginStatusFunc, setUserInfo } from '@SH/Services/common/middlewares';
import { findUser } from '@SH/Services/user/user';
import { NextFunction, Request, Response } from 'express';

export async function loginCheckMiddleWare(req: Request, res: Response, next: NextFunction) {
  async function setReqeustUserInfo(accessToken: string) {
    const [type, user] = await setUserInfo(accessToken);
    req.type = type;
    req.user = user;
  }

  const cookies = req.headers.cookie;
  const [status, refreshAccessToken] = loginStatusFunc(cookies);

  try {
    if (status === 'loginFail' || refreshAccessToken === undefined) {
      return res
        .status(redirectLoginPage.statusCode)
        .send({ msg: redirectLoginPage.message, category: redirectLoginPage.category });
    }

    if (status === 'getKakaoAccess') {
      const refreshToken = refreshAccessToken;
      const { accessTokenInfo, refreshToeknInfo } = await getSignedAccessRefreshToken(refreshToken);

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

      await setReqeustUserInfo(accessTokenInfo.signedAccessToken);
    }

    if (status === 'loginSuccess') {
      const accessToken = refreshAccessToken;
      await setReqeustUserInfo(accessToken);
    }

    return next();
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
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
