import { getRepository } from 'typeorm';
import User from '@SH/Entities/user/user';
import jwt from 'jsonwebtoken';

export async function findUser(email: string) {
  const userRepo = getRepository(User);
  const res = await userRepo.findOne({ where: { email } });
  return res;
}

export function tokenSign(email: string) {
  if (process.env.JWT === undefined) {
    return false;
  }
  const token = jwt.sign({ email }, process.env.JWT);
  return token;
}

export function auth() {}
