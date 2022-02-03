import { getRepository } from 'typeorm';
import User from '@SH/Entities/user/user';
import jwt from 'jsonwebtoken';
import { kakao_authCode } from '@Libs/api/kakao';
import { signUpType } from '@Libs/constants/types';

export async function findUser(email: string) {
  const userRepo = getRepository(User);
  const res = await userRepo.findOne({ where: { email } });
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
  const token = await jwt.sign({ email }, process.env.JWT, { expiresIn: '1h' });
  return token;
}

export async function kakaoAuth() {
  if (process.env.KAKAO_KEY === undefined || process.env.KAKAO_REDIRECT_URI === undefined) {
    return false;
  }

  const result = await kakao_authCode(process.env.KAKAO_KEY, process.env.KAKAO_REDIRECT_URI);
  return result;
}
