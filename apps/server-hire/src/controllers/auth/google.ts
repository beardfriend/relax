/* eslint-disable @typescript-eslint/naming-convention */
import { serverError, alreadyAccessToken, googleCodeNotFound } from '@Libs/constants/messages';
import { google_getToken, goolge_authcode } from '@Libs/api/google';
import jwt, { GoogleUserDataPayload } from 'jsonwebtoken';
import { Response, Request } from 'express';
import env from '@SH/env';
import { findGoogleUser, createGoogleUser } from '@SH/Services/user/user';
import { normalExpireIn, normalMaxAge } from '@Libs/constants/constant';
import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';

async function googleAuthUrl() {
  const result = await goolge_authcode({
    client_id: env.google.key,
    redirect_uri: env.google.redirect_uri,
    response_type: 'code',
    scope: ' openid profile email https://www.googleapis.com/auth/drive.file',
    access_type: 'offline',
  });
  return result.request.res.responseUrl;
}

export async function googleGetCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;
  try {
    if (cookies === undefined) {
      const url = await googleAuthUrl();
      return res.redirect(url);
    }
    const splitedCookies = splitCookie(cookies);
    const accessToken = findCookieValue(splitedCookies, token.LOGIN);

    if (accessToken === false) {
      const url = await googleAuthUrl();
      return res.redirect(url);
    }
    return res
      .status(alreadyAccessToken.statusCode)
      .send({ msg: alreadyAccessToken.message, category: alreadyAccessToken.category });
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}

export async function googleGetToken(req: Request, res: Response) {
  if (req.query.code === undefined) {
    return res
      .status(googleCodeNotFound.statusCode)
      .send({ msg: googleCodeNotFound.message, category: googleCodeNotFound.category });
  }
  try {
    const result = await google_getToken({
      client_id: env.google.key,
      client_secret: env.google.password,
      redirect_uri: env.google.redirect_uri,
      code: req.query.code as string,
      grant_type: 'authorization_code',
    });

    const { id_token } = result.data;

    const userData = await (<GoogleUserDataPayload>jwt.decode(id_token));
    const { sub, email } = userData;
    const isAlreadyGoogleUser = await findGoogleUser(sub);

    if (isAlreadyGoogleUser === undefined) {
      await createGoogleUser(sub, email);
    }

    const signedGoogleID = await jwt.sign({ google_id: sub, type: 'google' }, env.jwt, {
      expiresIn: normalExpireIn,
    });

    res.cookie(token.LOGIN, signedGoogleID, { maxAge: normalMaxAge, httpOnly: true });

    return res.redirect(env.google.finish_uri);
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}
