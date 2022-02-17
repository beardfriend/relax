import { serverError, envError, axiosBasic, alreadyAccessToken, googleCodeNotFound } from '@Libs/constants/messages';
import { google_getToken, goolge_authcode } from '@Libs/api/google';
import jwt, { GoogleUserDataPayload } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { findGoogleUser, createGoogleUser } from '@SH/Services/user/user';
import { normalExpireIn, normalMaxAge } from '@Libs/constants/constant';
import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';

export async function googleGetCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (
    process.env.GOOGLE_KEY === undefined ||
    process.env.GOOGLE_REDIRECT_URI === undefined ||
    process.env.JWT === undefined
  ) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }

  if (cookies === undefined) {
    if (process.env.GOOGLE_KEY === undefined || process.env.GOOGLE_REDIRECT_URI === undefined) {
      return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
    }
    try {
      const result = await goolge_authcode({
        client_id: process.env.GOOGLE_KEY,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: ' openid profile email https://www.googleapis.com/auth/drive.file',
        access_type: 'offline',
      });

      return res.json(result.request.res.responseUrl);
    } catch (error) {
      return res.status(axiosBasic.statusCode).send({ msg: axiosBasic.message, category: axiosBasic.category });
    }
  } else {
    const splitedCookies = splitCookie(cookies);
    const accessToken = findCookieValue(splitedCookies, token.LOGIN);

    if (accessToken === false) {
      try {
        const result = await goolge_authcode({
          client_id: process.env.GOOGLE_KEY,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          response_type: 'code',
          scope: ' openid profile email https://www.googleapis.com/auth/drive.file',
          access_type: 'offline',
        });
        return res.json(result.request.res.responseUrl);
      } catch (error) {
        return res.status(axiosBasic.statusCode).send({ msg: axiosBasic.message, category: axiosBasic.category });
      }
    } else {
      return res
        .status(alreadyAccessToken.statusCode)
        .send({ msg: alreadyAccessToken.message, category: alreadyAccessToken.category });
    }
  }
}

export async function googleGetToken(req: Request, res: Response) {
  if (req.query.code === undefined) {
    return res
      .status(googleCodeNotFound.statusCode)
      .send({ msg: googleCodeNotFound.message, category: googleCodeNotFound.category });
  }
  if (
    process.env.GOOGLE_KEY === undefined ||
    process.env.GOOGLE_PASS === undefined ||
    process.env.GOOGLE_REDIRECT_URI === undefined ||
    process.env.JWT === undefined ||
    process.env.GOOGLE_FINISH_URI === undefined
  ) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }
  try {
    const result = await google_getToken({
      client_id: process.env.GOOGLE_KEY,
      client_secret: process.env.GOOGLE_PASS,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      code: req.query.code as string,
      grant_type: 'authorization_code',
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id_token } = result.data;

    const userData = await (<GoogleUserDataPayload>jwt.decode(id_token));
    const { sub, email } = userData;
    const isAlreadyGoogleUser = await findGoogleUser(sub);
    if (isAlreadyGoogleUser === undefined) {
      await createGoogleUser(sub, email);
    }

    const signedGoogleID = await jwt.sign({ google_id: sub, type: 'google' }, process.env.JWT, {
      expiresIn: normalExpireIn,
    });

    res.cookie(token.LOGIN, signedGoogleID, { maxAge: normalMaxAge, httpOnly: true });

    return res.redirect(process.env.GOOGLE_FINISH_URI);
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}
