import { getRepository } from 'typeorm';
import User from '@SH/Entities/user/user';

export async function findUser(email: string) {
  const userRepo = getRepository(User);
  const res = await userRepo.findOne({ where: { email } });
  return res;
}

export function auth() {}
