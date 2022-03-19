/* eslint-disable @typescript-eslint/naming-convention */
import token from '@Libs/constants/token';
import env from '@SH/env';
import {
  checkKakaoUser,
  checkRefreshToken,
  getKakaoRedirectUrl,
  getkakaoTokenData,
  getKakaoUserId,
  getSignedAccessRefreshTokenKaKao,
} from '@SH/Services/auth/kakao';
import { getSignedAccessRefreshToken } from '@SH/Services/common/middlewares';
import { createKakaoUser } from '@SH/Services/user/user';
import { Request, Response } from 'express';

export async function getCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  const refreshToken = checkRefreshToken(cookies);

  if (!refreshToken) {
    const url = await getKakaoRedirectUrl();
    return res.redirect(url);
  }

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

  return res.redirect(env.kakao.finish_uri);
}

export async function getToken(req: Request, res: Response) {
  const { accessTokenInfo, refreshTokenInfo } = await getkakaoTokenData(req.query.code as string);

  const userId = await getKakaoUserId(accessTokenInfo.accessToken);

  const isAlreadyKakaoUser = await checkKakaoUser(userId);

  if (!isAlreadyKakaoUser) {
    await createKakaoUser(userId);
  }

  const { signedAccessToken, signedRefreshToken } = await getSignedAccessRefreshTokenKaKao(userId, {
    accessTokenInfo,
    refreshTokenInfo,
  });

  res.cookie(token.LOGIN, signedAccessToken, { maxAge: accessTokenInfo.expiresIn, httpOnly: true });
  res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refreshTokenInfo.refreshToken, httpOnly: true });

  return res.redirect(env.kakao.finish_uri);
}
