import { EntityManager } from 'typeorm';
import User from '@SH/Entities/user/user';

export async function findUser(manager: EntityManager, email: string) {
  const res = await manager.findOne(User, email);
  return res;
}

export function auth() {}
