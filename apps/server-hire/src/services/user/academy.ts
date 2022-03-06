import { databaseError } from '@Libs/constants/messages';
import Academy from '@SH/Entities/user/academy';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager } from 'typeorm';

export async function createAcademy(findedUser: DeepPartial<User>) {
  const manager = getManager();
  const academy = manager.create(Academy, {
    user: findedUser,
  });
  try {
    await manager.save(academy);
  } catch (error) {
    throw new Error(databaseError.message);
  }
  return academy;
}

export function noEmpty() {
  return 'hello';
}
