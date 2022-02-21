import { getRepository, getManager } from 'typeorm';
import User from '@SH/Entities/user/user';
// import AcademyProfile from '@SH/Entities/user/academyProfile';
import AcademyBusiness from '@SH/Entities/user/academyBusiness';
import jwt from 'jsonwebtoken';
import { kakao_authCode } from '@Libs/api/kakao';
import { signUpType } from '@Libs/constants/types';
import { normalExpireIn } from '@Libs/constants/constant';

export async function findUser(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const userRepo = getRepository(User);

  if (loginType === 'normal') {
    const res = await userRepo.findOne({
      where: { email: uniqueKey, signup_type: signUpType.NORMAL },
    });
    return res;
  }

  if (loginType === 'google') {
    const res = await userRepo.findOne({ where: { google_id: uniqueKey, signup_type: signUpType.GOOGLE } });
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

export async function findGoogleUser(googleId: string) {
  const userRepo = getRepository(User);
  const res = await userRepo.findOne({ where: { google_id: googleId, signup_type: signUpType.GOOGLE } });
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

export async function findAcademyBusiness(businessNumber: string) {
  const academyBusinessRepo = getRepository(AcademyBusiness);
  try {
    const res = await academyBusinessRepo.findOne({ where: { bussiness_number: businessNumber } });
    return res;
  } catch (error) {
    return false;
  }
}

export async function createGoogleUser(sub: string, email: string) {
  const manager = await getManager();
  const user = manager.create(User, {
    signup_type: signUpType.GOOGLE,
    google_id: sub,
    email,
  });
  await manager.save(user);
}

export async function createKakaoUser(id: number, email?: string) {
  const manager = await getManager();
  const user = manager.create(User, {
    signup_type: signUpType.KAKAO,
    kakao_id: id,
    email,
  });
  await manager.save(user);
}

export async function createNormalUser(email: string, password: string) {
  const manager = await getManager();
  const user = manager.create(User, {
    signup_type: signUpType.NORMAL,
    email,
    password,
  });
  await manager.save(user);
}
