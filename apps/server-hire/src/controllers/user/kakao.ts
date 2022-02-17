import { kakao_getToken, kakao_getUserData, kakao_token_update } from '@Libs/api/kakao';
import { serverError, envError, alreadyAccessToken, verfiyError } from '@Libs/constants/messages';
import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';
import { createKakaoUser, findKakaoUser, kakaoAuth } from '@SH/Services/user/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function getCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (
    process.env.KAKAO_KEY === undefined ||
    process.env.KAKAO_FINISH_URI === undefined ||
    process.env.JWT === undefined
  ) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }

  if (cookies === undefined) {
    try {
      const result = await kakaoAuth();
      if (result === false) {
        return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
      }
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
        const result = await kakaoAuth();
        if (result === false) {
          return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
        }
        return res.json(result.request.res.responseUrl);
      } catch (error) {
        return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
      }
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
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

    return res.redirect(process.env.KAKAO_FINISH_URI);
  }
}

export async function getToken(req: Request, res: Response) {
  if (
    req.query.code === undefined ||
    process.env.KAKAO_KEY === undefined ||
    process.env.KAKAO_REDIRECT_URI === undefined ||
    process.env.KAKAO_FINISH_URI === undefined ||
    process.env.JWT === undefined
  ) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
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
      await createKakaoUser(userData.data.id);
    }

    const signedAccessToken = await jwt.sign({ access_token, type: 'kakao' }, process.env.JWT, {
      expiresIn: expires_in,
    });
    const signedRefreshToken = await jwt.sign({ refresh_token, type: 'kakao' }, process.env.JWT, {
      expiresIn: refresh_token_expires_in,
    });

    res.cookie(token.LOGIN, signedAccessToken, { maxAge: expires_in, httpOnly: true });
    res.cookie(token.RefreshKakao, signedRefreshToken, { maxAge: refresh_token_expires_in, httpOnly: true });

    return res.redirect(process.env.KAKAO_FINISH_URI);
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}
