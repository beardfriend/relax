import { getRepository } from 'typeorm';
import User from '@SH/Entities/user/user';
import jwt from 'jsonwebtoken';
import { kakao_authCode } from '@Libs/api/kakao';
import { signUpType } from '@Libs/constants/types';
import { normalExpireIn } from '@Libs/constants/constant';

export async function findUser(uniqueKey: string | number, loginType: 'normal' | 'kakao') {
  const userRepo = getRepository(User);
  if (loginType === 'normal') {
    const res = await userRepo.findOne({ where: { email: uniqueKey, signup_type: signUpType.NORMAL } });
    return res;
  }

  const res = await userRepo.findOne({ where: { kakao_id: uniqueKey, signup_type: signUpType.KAKAO } });
  return res;
}

export async function findKakaoUser(kakaoId: string) {
  const userRepo = getRepository(User);
  const res = await userRepo.findOne({ where: { kakao_id: kakaoId, signup_type: signUpType.KAKAO } });
  return res;
}

export async function tokenSign(email: string) {
  if (process.env.JWT === undefined) {
    return false;
  }
  const signToken = await jwt.sign({ email, type: 'normal' }, process.env.JWT, { expiresIn: normalExpireIn });
  return signToken;
}

export async function kakaoAuth() {
  if (process.env.KAKAO_KEY === undefined || process.env.KAKAO_REDIRECT_URI === undefined) {
    return false;
  }
  try {
    const result = await kakao_authCode(process.env.KAKAO_KEY, process.env.KAKAO_REDIRECT_URI);
    return result;
  } catch (error) {
    return false;
  }
}
