import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';

export function getAccessToken(cookies: string): string | undefined {
  const splitedCookies = splitCookie(cookies);
  const refreshToken = findCookieValue(splitedCookies, token.LOGIN);

  return refreshToken;
}

export function checkAccessToken(cookies: string | undefined) {
  if (cookies === undefined) {
    return false;
  }
  const accessToken = getAccessToken(cookies);

  if (accessToken === undefined) {
    return false;
  }

  return accessToken;
}
