/* eslint-disable @typescript-eslint/naming-convention */
import { kakao_getToken, kakao_getUserData, kakao_token_update, kakao_authCode } from '@Libs/api/kakao';
import { serverError, alreadyAccessToken, verfiyError } from '@Libs/constants/messages';
import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { createKakaoUser, findKakaoUser } from '@SH/Services/user/user';
import { Request, Response } from 'express';
import env from '@SH/env';
import jwt from 'jsonwebtoken';

export async function getCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (cookies === undefined) {
    try {
      const result = await kakao_authCode(env.kakao.key, env.kakao.redirect_uri);

      return res.json(result.request.res.responseUrl);
    } catch (error) {
      return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
    }
  } else {
    const splitedCookies = splitCookie(cookies);
    const accessToken = findCookieValue(splitedCookies, token.LOGIN);

    if (typeof accessToken === 'string') {
      return res
        .status(alreadyAccessToken.statusCode)
        .send({ msg: alreadyAccessToken.message, category: alreadyAccessToken.category });
    }

    const refreshToken = findCookieValue(splitedCookies, token.RefreshKakao);

    if (refreshToken === false) {
      try {
        const result = await kakao_authCode(env.kakao.key, env.kakao.redirect_uri);
        return res.json(result.request.res.responseUrl);
      } catch (error) {
        return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
      }
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
    return res.redirect(env.kakao.finish_uri);
  }
}

export async function getToken(req: Request, res: Response) {
  try {
    const result = await kakao_getToken({
      grant_type: 'authorization_code',
      client_id: env.kakao.key,
      redirect_uri: env.kakao.redirect_uri,
      code: req.query.code as string,
    });

    const { access_token, refresh_token, expires_in, refresh_token_expires_in } = result.data;

    const userData = await kakao_getUserData(access_token);

    const isAlreadyKakaoUser = await findKakaoUser(userData?.data.id);

    if (isAlreadyKakaoUser === undefined) {
      await createKakaoUser(userData.data.id);
    }

    const signedAccessToken = await jwt.sign({ access_token, type: 'kakao', kakao_id: userData.data.id }, env.jwt, {
      expiresIn: expires_in,
    });
    const signedRefreshToken = await jwt.sign({ refresh_token, type: 'kakao' }, env.jwt, {
      expiresIn: refresh_token_expires_in,
    });

    res.cookie(token.LOGIN, signedAccessToken, { maxAge: expires_in, httpOnly: true });
    res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refresh_token_expires_in, httpOnly: true });

    return res.redirect(env.kakao.finish_uri);
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}
