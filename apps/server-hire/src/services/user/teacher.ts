import { databaseError } from '@Libs/constants/messages';
import { userKey } from '@Libs/interface/user';
import { swtichLoginType } from '@Libs/utils/switch';
import Teacher from '@SH/Entities/user/teacher';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager, getRepository } from 'typeorm';

export async function createTeacher(findedUser: DeepPartial<User>) {
  const manager = getManager();
  const teacher = manager.create(Teacher, {
    user: findedUser,
  });
  const user = findedUser;
  user.teacher = teacher;
  try {
    await manager.save(teacher);
    await manager.save(user);
  } catch (error) {
    console.log(error);
  }
}

export async function findTeacher(uniqueKey: userKey.uniqueKey, loginType: userKey.loginType) {
  const UserRepo = getRepository(User);
  try {
    const res = await UserRepo.findOne({
      join: { alias: 'user', leftJoinAndSelect: { teacher: 'user.teacher' } },
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

export async function noEmpty() {
  return 'hello';
}
