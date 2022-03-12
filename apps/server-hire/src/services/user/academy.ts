import { databaseError } from '@Libs/constants/messages';
import { swtichLoginType } from '@Libs/utils/switch';
import Academy from '@SH/Entities/user/academy';
import User from '@SH/Entities/user/user';
import { userKey } from '@Libs/interface/user';
import { DeepPartial, getManager, getRepository } from 'typeorm';

export async function createAcademy(findedUser: DeepPartial<User>) {
  const manager = getManager();
  const academy = manager.create(Academy, {
    user: findedUser,
  });
  const user = findedUser;
  user.academy = academy;
  try {
    await manager.save(academy);
    await manager.save(user);
    return academy;
  } catch (error) {
    throw new Error(databaseError.message);
  }
}

export async function findAcademy(uniqueKey: userKey.uniqueKey, loginType: userKey.loginType) {
  const UserRepo = getRepository(User);
  try {
    const res = await UserRepo.findOne({
      join: { alias: 'user', leftJoinAndSelect: { academy: 'user.academy' } },
      where: swtichLoginType(uniqueKey, loginType),
    });
    if (res === undefined) {
      throw new Error('user not found Logic Error');
    }
    return res;
  } catch (error) {
    throw new Error(databaseError.message);
  }
}

export async function findAcademy2(email: string | number) {
  const res = await getRepository(Academy)
    .createQueryBuilder('academy')
    .select(['user.id', 'academy.id', 'academy.academy_profile'])
    .leftJoinAndSelect('academy.user', 'user')
    .where('user.email = :email', { email })
    .getOne();
  return res;
}
