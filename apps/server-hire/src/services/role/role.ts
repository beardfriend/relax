import { userType } from '@Libs/constants/types';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager } from 'typeorm';
import { createTeacher } from '../user/teacher';

export default async function updateRole(findedUser: DeepPartial<User>, role: string) {
  const manager = getManager();
  const user = findedUser;

  if (role === 'ACADEMY') {
    user.role = userType.ACADEMY;
  } else if (role === 'TEACHER') {
    user.role = userType.TEACHER;
    await createTeacher(findedUser);
  } else {
    throw new Error('error');
  }
  await manager.save(user);
}
