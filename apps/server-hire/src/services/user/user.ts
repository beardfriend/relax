import { signUpType } from '@Libs/constants/types';
import { swtichLoginType } from '@Libs/utils/switch';
import User from '@SH/Entities/user/user';
import { getManager, getRepository } from 'typeorm';

export async function findUser(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const userRepo = getRepository(User);
  try {
    const res = await userRepo.findOne({
      where: swtichLoginType(uniqueKey, loginType),
    });
    return res;
  } catch (error) {
    throw new Error('user find not clear');
  }
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

export async function createGoogleUser(sub: string, email: string) {
  const manager = getManager();
  const user = manager.create(User, {
    signupType: signUpType.GOOGLE,
    googleId: sub,
    email,
  });
  await manager.save(user);
}

export async function createKakaoUser(id: number, email?: string) {
  const manager = getManager();
  const user = manager.create(User, {
    signupType: signUpType.KAKAO,
    kakaoId: id,
    email,
  });
  await manager.save(user);
}

export async function createNormalUser(email: string, password: string) {
  const manager = getManager();
  const user = manager.create(User, {
    signupType: signUpType.NORMAL,
    email,
    password,
  });

  await manager.save(user);
}
