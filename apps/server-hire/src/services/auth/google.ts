/* eslint-disable @typescript-eslint/naming-convention */
import { google_getToken, goolge_authcode } from '@Libs/api/google';
import { normalExpireIn } from '@Libs/constants/constant';

import env from '@SH/env';
import jwt, { GoogleUserDataPayload } from 'jsonwebtoken';

export async function getGoogleAuthURL() {
  const result = await goolge_authcode({
    client_id: env.google.key,
    redirect_uri: env.google.redirect_uri,
    response_type: 'code',
    scope: ' openid profile email https://www.googleapis.com/auth/drive.file',
    access_type: 'offline',
  });
  return result.request.res.responseUrl;
}

export async function getGoogleUserData(queryString: string) {
  const result = await google_getToken({
    client_id: env.google.key,
    client_secret: env.google.password,
    redirect_uri: env.google.redirect_uri,
    code: queryString,
    grant_type: 'authorization_code',
  });

  const { id_token } = result.data;

  const userData = await (<GoogleUserDataPayload>jwt.decode(id_token));
  const { sub, email } = userData;
  return { sub, email };
}

export async function signGoogleToken(sub: string) {
  const signGoogleID = await jwt.sign({ google_id: sub, type: 'google' }, env.jwt, {
    expiresIn: normalExpireIn,
  });
  return signGoogleID;
}
