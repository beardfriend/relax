import token from '@Libs/constants/token';
import jwt from 'jsonwebtoken';
import env from '@SH/env';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { verfiyError } from '@Libs/constants/messages';
import { kakao_getUserData, kakao_token_update } from '@Libs/api/kakao';

export function getAccessRefreshToken(cookies: string) {
  const splitedCookies = splitCookie(cookies);
  const accessToken = findCookieValue(splitedCookies, token.LOGIN);
  const refreshToken = findCookieValue(splitedCookies, token.RefreshKakao);
  return { accessToken, refreshToken };
}

export async function getSignedAccessRefreshToken(refreshToken: string) {
  const verifyRefreshToken = await jwt.verify(refreshToken, env.jwt);

  if (typeof verifyRefreshToken === 'string') {
    throw new Error(verfiyError.message);
  }

  const updatedResult = await kakao_token_update({
    grant_type: 'refresh_token',
    client_id: env.kakao.key,
    refresh_token: verifyRefreshToken.refresh_token,
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, expires_in, refresh_token, refresh_token_expires_in } = updatedResult.data;

  const signedAccessToken = await jwt.sign({ access_token, type: 'kakao' }, env.jwt, {
    expiresIn: expires_in,
  });

  if (refresh_token !== undefined && refresh_token_expires_in !== undefined) {
    const signedRefreshToken = await jwt.sign({ refresh_token, type: 'kakao' }, env.jwt, {
      expiresIn: refresh_token_expires_in,
    });
    return {
      accessTokenInfo: { signedAccessToken, expiresIn: expires_in },
      refreshToeknInfo: { signedRefreshToken, refreshExpiresIn: refresh_token_expires_in },
    };
  }
  return { accessTokenInfo: { signedAccessToken, expiresIn: expires_in } };
}

export async function setUserInfoKakao(accessToken: string) {
  const verifyAccessToken = await jwt.verify(accessToken, env.jwt);

  if (typeof verifyAccessToken === 'string') {
    throw new Error(verfiyError.message);
  }
  const loginType = verifyAccessToken.type;
  const user = verifyAccessToken.iat;

  return [loginType, user];
}

export async function setUserInfo(accessToken: string) {
  const verifyAccessToken = await jwt.verify(accessToken, env.jwt);
  if (typeof verifyAccessToken === 'string') {
    throw new Error(verfiyError.message);
  }
  let user;
  const loginType = verifyAccessToken.type;
  if (loginType === 'normal') {
    user = verifyAccessToken.email;
  } else if (loginType === 'kakao') {
    const userData = await kakao_getUserData(verifyAccessToken.access_token);
    user = userData.data.id;
  } else if (loginType === 'google') {
    user = verifyAccessToken.google_id;
  }
  return [loginType, user];
}

interface Itoken {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export function isLoginStatusFunc(accessRefreshToken: Itoken) {
  const { accessToken, refreshToken } = accessRefreshToken;
  let status: string;

  if (
    (refreshToken !== undefined && accessToken !== undefined) ||
    (refreshToken === undefined && accessToken !== undefined)
  ) {
    status = 'loginSuccess';
    return [status, accessToken];
  }
  if (refreshToken === undefined && accessToken === undefined) {
    status = 'loginFail';
    return [status];
  }
  if (refreshToken !== undefined && accessToken === undefined) {
    status = 'getKakaoAccess';
    return [status, refreshToken];
  }
  return [];
}
