import Teacher from '@SH/Entities/user/teacher';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager } from 'typeorm';

export async function createTeacher(findedUser: DeepPartial<User>) {
  const manager = getManager();
  const teacher = manager.create(Teacher, {
    id: findedUser,
  });
  const user = findedUser;
  user.teacher = teacher;
  try {
    await manager.save(user);
    await manager.save(teacher);
  } catch (error) {
    console.log(error);
  }
}

export async function noEmpty() {
  return 'hello';
}
