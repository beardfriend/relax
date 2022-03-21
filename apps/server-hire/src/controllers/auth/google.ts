/* eslint-disable @typescript-eslint/naming-convention */
import { normalMaxAge } from '@Libs/constants/constant';
import { alreadyAccessToken, googleCodeNotFound, serverError } from '@Libs/constants/messages';
import token from '@Libs/constants/token';
import env from '@SH/env';
import { getGoogleAuthURL, getGoogleUserData, signGoogleToken } from '@SH/Services/auth/google';
import { checkAccessToken } from '@SH/Services/common/token';
import { createGoogleUser, findGoogleUser } from '@SH/Services/user/user';
import { Request, Response } from 'express';

export async function googleGetCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;
  try {
    const accessToken = checkAccessToken(cookies);

    if (!accessToken) {
      const url = await getGoogleAuthURL();
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
    const { sub, email } = await getGoogleUserData(req.query.code as string);

    const isAlreadyGoogleUser = await findGoogleUser(sub);

    if (!isAlreadyGoogleUser) {
      await createGoogleUser(sub, email);
    }

    const signedGoogleID = await signGoogleToken(sub);

    res.cookie(token.LOGIN, signedGoogleID, { maxAge: normalMaxAge, httpOnly: true });

    return res.redirect(env.google.finish_uri);
  } catch (error) {
    return res.status(serverError.statusCode).send({ msg: serverError.message, category: serverError.category });
  }
}
