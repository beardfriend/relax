import { serverError } from '@Libs/constants/messages';
import { google_getToken, goolge_authcode } from '@Libs/api/google';
import jwt, { GoogleUserDataPayload } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { findGoogleUser } from '@SH/Services/user/user';
import { getManager } from 'typeorm';
import { normalExpireIn, normalMaxAge } from '@Libs/constants/constant';
import User from '@SH/Entities/user/user';
import { signUpType } from '@Libs/constants/types';
import token from '@Libs/constants/token';
import { findCookieValue, splitCookie } from '@Libs/utils/cookie';

export async function googleGetCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (
    process.env.GOOGLE_KEY === undefined ||
    process.env.GOOGLE_REDIRECT_URI === undefined ||
    process.env.JWT === undefined
  ) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }

  if (cookies === undefined) {
    if (process.env.GOOGLE_KEY === undefined || process.env.GOOGLE_REDIRECT_URI === undefined) {
      return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
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
      return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
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
        return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
      }
    } else {
      return res.send({ msg: '이미 access토큰이 존재합니다.' });
    }
  }
}

export async function googleGetToken(req: Request, res: Response) {
  if (req.query.code === undefined) {
    return res.status(serverError.statusCode).send({ msg: '코드가 넘어오지 않음', category: serverError.category });
  }
  if (
    process.env.GOOGLE_KEY === undefined ||
    process.env.GOOGLE_PASS === undefined ||
    process.env.GOOGLE_REDIRECT_URI === undefined ||
    process.env.JWT === undefined ||
    process.env.GOOGLE_FINISH_URI === undefined
  ) {
    return res.status(500).send('env error');
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
      const manager = await getManager();
      const user = new User();
      user.signup_type = signUpType.GOOGLE;
      user.google_id = sub;
      user.email = email;
      await manager.save(user);
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
