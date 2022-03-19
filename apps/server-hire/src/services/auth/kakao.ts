import jwt from 'jsonwebtoken';
import { kakao_authCode, kakao_getToken, kakao_getUserData } from '@Libs/api/kakao';
import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import env from '@SH/env';
import { findKakaoUser } from '../user/user';

export async function getKakaoRedirectUrl() {
  try {
    const result = await kakao_authCode(env.kakao.key, env.kakao.redirect_uri);
    return result.request.res.responseUrl as string;
  } catch (error) {
    throw new Error('getKakaoRedirectUrl Error');
  }
}

export function getRefreshToken(cookies: string): string | undefined {
  const splitedCookies = splitCookie(cookies);
  const refreshToken = findCookieValue(splitedCookies, token.RefreshKakao);

  return refreshToken;
}

export function checkRefreshToken(cookies: string | undefined) {
  if (cookies === undefined) {
    return false;
  }
  const refreshToken = getRefreshToken(cookies);

  if (refreshToken === undefined) {
    return false;
  }

  return refreshToken;
}

export async function getkakaoTokenData(queryString: string) {
  const result = await kakao_getToken({
    grant_type: 'authorization_code',
    client_id: env.kakao.key,
    redirect_uri: env.kakao.redirect_uri,
    code: queryString as string,
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, refresh_token, expires_in, refresh_token_expires_in } = result.data;

  return {
    accessTokenInfo: { accessToken: access_token, expiresIn: expires_in },
    refreshTokenInfo: { refreshToken: refresh_token, refreshExpiresIn: refresh_token_expires_in },
  };
}

export async function getKakaoUserId(acessToken: string) {
  const userData = await kakao_getUserData(acessToken);
  return userData.data.id as number;
}

export async function checkKakaoUser(userId: number) {
  const isAlreadyKakaoUser = await findKakaoUser(userId);
  if (isAlreadyKakaoUser === undefined) {
    return false;
  }
  return true;
}

interface ItokenInfo {
  accessTokenInfo: { accessToken: string; expiresIn: number };
  refreshTokenInfo: { refreshToken: string; refreshExpiresIn: number };
}

export async function getSignedAccessRefreshTokenKaKao(
  userId: number,
  { accessTokenInfo, refreshTokenInfo }: ItokenInfo
) {
  const { accessToken, expiresIn } = accessTokenInfo;
  const { refreshToken, refreshExpiresIn } = refreshTokenInfo;

  const signedAccessToken = await jwt.sign({ accessToken, type: 'kakao', kakao_id: userId }, env.jwt, {
    expiresIn,
  });
  const signedRefreshToken = await jwt.sign({ refreshToken, type: 'kakao' }, env.jwt, { expiresIn: refreshExpiresIn });

  return { signedAccessToken, signedRefreshToken };
}
