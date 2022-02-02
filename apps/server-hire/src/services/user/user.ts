import { getRepository } from 'typeorm';
import User from '@SH/Entities/user/user';
import jwt from 'jsonwebtoken';

export async function findUser(email: string) {
  const userRepo = getRepository(User);
  const res = await userRepo.findOne({ where: { email } });
  return res;
}

export async function tokenSign(email: string) {
  if (process.env.JWT === undefined) {
    return false;
  }
  const token = await jwt.sign({ email }, process.env.JWT, { expiresIn: '1h' });
  return token;
}

export function auth() {}
