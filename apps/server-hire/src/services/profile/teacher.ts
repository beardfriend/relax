import { switchLoginType2, swtichImageCategory } from '@Libs/utils/switch';
import User from '@SH/Entities/user/user';
import { getRepository } from 'typeorm';
import createImage from '../image';

export async function findTeacherProfile(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'teacher.id'])
    .innerJoin('user.teacher', 'teacher')
    .innerJoinAndSelect('teacher.teacherProfile', 'profile')
    .where(switchLoginType2(loginType), { uniqueKey })
    .getOne();

  return res;
}

export async function createProfileImage(image: { [fieldname: string]: Express.Multer.File }) {
  const { TEACHER_PROFILE } = image;
  const isProfile = TEACHER_PROFILE === undefined ? 'No' : 'Yes';

  if (isProfile === 'Yes') {
    const { fieldname, mimetype, path, size } = TEACHER_PROFILE;
    const profileImage = await createImage({
      fileType: mimetype,
      path,
      volume: size,
      category: swtichImageCategory(fieldname),
    });
    return profileImage;
  }
  return undefined;
}
