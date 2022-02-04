import { kakao_getToken, kakao_getUserData, kakao_token_update } from '@Libs/api/kakao';
import { serverError } from '@Libs/constants/messages';
import token from '@Libs/constants/token';
import { signUpType } from '@Libs/constants/types';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import User from '@SH/Entities/user/user';
import { findKakaoUser, kakaoAuth } from '@SH/Services/user/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';

export async function getCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (
    cookies === undefined ||
    process.env.KAKAO_KEY === undefined ||
    process.env.KAKAO_FINISH_URI === undefined ||
    process.env.JWT === undefined
  ) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }

  const splitedCookies = splitCookie(cookies);
  const accessToken = findCookieValue(splitedCookies, token.LOGIN);

  if (typeof accessToken === 'string') {
    return res.send({ msg: '이미 access토큰이 존재합니다.' });
  }

  const refreshToken = findCookieValue(splitedCookies, token.RefreshKakao);

  if (accessToken === false || refreshToken === false) {
    try {
      const result = await kakaoAuth();
      if (result === false) {
        return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
      }
      return res.json(result.request.res.responseUrl);
    } catch (error) {
      return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
    }
  }

  const updateResult = await kakao_token_update({
    grant_type: 'refresh_token',
    client_id: process.env.KAKAO_KEY,
    refresh_token: refreshToken,
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, expires_in, refresh_token, refresh_token_expires_in } = updateResult.data;

  const signedAccessToken = await jwt.sign({ access_token, type: 'kakao' }, process.env.JWT, expires_in);

  res.cookie(token.LOGIN, signedAccessToken, { maxAge: expires_in, httpOnly: true });

  if (refresh_token !== undefined && refresh_token_expires_in !== undefined) {
    const signedRefreshToken = await jwt.sign(
      { refresh_token, type: 'kakao' },
      process.env.JWT,
      refresh_token_expires_in
    );
    res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refresh_token_expires_in, httpOnly: true });
  }
  return res.redirect(process.env.KAKAO_FINISH_URI);
}

export async function getToken(req: Request, res: Response) {
  if (
    req.query.code === undefined ||
    process.env.KAKAO_KEY === undefined ||
    process.env.KAKAO_REDIRECT_URI === undefined ||
    process.env.KAKAO_FINISH_URI === undefined ||
    process.env.JWT === undefined
  ) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }

  try {
    const result = await kakao_getToken({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: req.query.code as string,
    });

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token, refresh_token, expires_in, refresh_token_expires_in } = result.data;

    const userData = await kakao_getUserData(access_token);

    const isAlreadyKakaoUser = await findKakaoUser(userData?.data.id);

    if (isAlreadyKakaoUser === undefined) {
      const manager = await getManager();
      const user = new User();
      user.signup_type = signUpType.KAKAO;
      user.kakao_id = userData.data.id;
      await manager.save(user);
    }

    const signedAccessToken = await jwt.sign({ access_token, type: 'kakao' }, process.env.JWT, expires_in);
    const signedRefreshToken = await jwt.sign(
      { refresh_token, type: 'kakao' },
      process.env.JWT,
      refresh_token_expires_in
    );

    res.cookie(token.LOGIN, signedAccessToken, { maxAge: expires_in, httpOnly: true });
    res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refresh_token_expires_in, httpOnly: true });

    return res.redirect(process.env.KAKAO_FINISH_URI);
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}
