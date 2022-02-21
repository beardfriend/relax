import { getRepository, getManager, DeepPartial } from 'typeorm';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import User from '@SH/Entities/user/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findTeacherProfile(user: any) {
  const teacherProfileRepo = getRepository(TeacherProfile);
  const res = await teacherProfileRepo.find({ where: { user } });
  return res;
}
export async function createTeacherProfile(user: DeepPartial<User>) {
  const manager = getManager();
  const teacherProfile = manager.create(TeacherProfile, { user });
  await manager.save(teacherProfile);

  const users = user;
  users.teacher_profile = teacherProfile;

  await manager.save(users);
}

export async function findTeacher(id: string | number) {
  const userRepo = getRepository(User);
  const user = await userRepo.find({
    select: ['teacher_profile', 'phone_number', 'email'],
    where: { id },
    relations: ['teacher_profile'],
  });
  return user;
}

export async function findTeacherTest(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const userRepo = getRepository(User);
  if (loginType === 'normal') {
    const user = await userRepo
      .createQueryBuilder('user')
      .select(['user.teacher_profile', ''])
      .where('user.email = :email', { email: uniqueKey })
      .getRawOne();
    return user;
  }
  if (loginType === 'google') {
    const user = await userRepo
      .createQueryBuilder('user')
      .select(['user.teacher_profile'])
      .where('user.google_id = :google_id', { google_id: uniqueKey })
      .getRawOne();
    return user;
  }
  const user = await userRepo
    .createQueryBuilder('user')
    .select(['user.teacher_profile'])
    .where('user.kakao_id = :kakao_id', { kakao_id: uniqueKey })
    .getRawOne();
  return user;
}
