import { Request, Response } from 'express';
import { findKakaoUser, kakaoAuth } from '@SH/Services/user/user';
import { kakao_getToken, kakao_getUserData, kakao_token_update } from '@Libs/api/kakao';
import { getManager } from 'typeorm';
import User from '@SH/Entities/user/user';
import { signUpType } from '@Libs/constants/types';

export async function getCode(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (cookies === undefined) {
    const result = await kakaoAuth();
    if (result === false) {
      return res.status(500);
    }
    return res.json(result.request.res.responseUrl);
  }

  const cookie = cookies.split('; ');
  const filteringElse = cookie.filter((datas) => !datas.indexOf('relax_kakao_refresh'));
  // access_token 있을  때 res.send 하기
  const refreshTokenValue = filteringElse[0].split('=')[1];

  if (process.env.KAKAO_KEY === undefined || process.env.KAKAO_FINISH_URI === undefined) {
    return res.status(500);
  }

  const updateResult = await kakao_token_update({
    grant_type: 'refresh_token',
    client_id: process.env.KAKAO_KEY,
    refresh_token: refreshTokenValue,
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, expires_in, refresh_token, refresh_token_expires_in } = updateResult.data;
  res.cookie('relax_kakao', access_token, { maxAge: expires_in, httpOnly: true });

  if (refresh_token !== undefined && refresh_token_expires_in !== undefined) {
    res.cookie('relax_kakao_refresh', refresh_token, { maxAge: refresh_token_expires_in, httpOnly: true });
  }
  return res.redirect(process.env.KAKAO_FINISH_URI);
}

export async function getToken(req: Request, res: Response) {
  if (
    req.query.code === undefined ||
    process.env.KAKAO_KEY === undefined ||
    process.env.KAKAO_REDIRECT_URI === undefined ||
    process.env.KAKAO_FINISH_URI === undefined
  ) {
    return res.status(500);
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
    console.log(userData?.data.id);
    console.log(isAlreadyKakaoUser);
    if (isAlreadyKakaoUser === undefined) {
      const manager = await getManager();
      const user = new User();
      user.signup_type = signUpType.KAKAO;
      user.kakao_id = userData.data.id;
      await manager.save(user);
    }

    res.cookie('relax_kakao', access_token, { maxAge: expires_in, httpOnly: true });
    res.cookie('relax_kakao_refresh', refresh_token, { maxAge: refresh_token_expires_in, httpOnly: true });
    res.redirect(process.env.KAKAO_FINISH_URI);
  } catch (error) {
    res.status(500);
  }
  return false;
}
