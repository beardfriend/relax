import { image } from '@Libs/interface/image';
import { IteacherProfileRequest, teacherProfileType } from '@Libs/interface/teacher';
import { IloginData } from '@Libs/interface/user';
import { dataCompareFunc } from '@Libs/utils/converter';
import { switchLoginType2, swtichImageCategory } from '@Libs/utils/switch';
import Images from '@SH/Entities/image';
import Teacher from '@SH/Entities/user/teacher';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import User from '@SH/Entities/user/user';
import { DeepPartial, getManager, getRepository } from 'typeorm';
import createImage from '../image';
import { findTeacher } from '../user/teacher';
import { createYogaList, updateYogaList } from '../yoga';

/* ***************
 * Find *
 *************** */
export async function findTeacherProfileId(loginData: IloginData) {
  const { loginType, uniqueKey } = loginData;
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'teacher.id'])
    .innerJoin('user.teacher', 'teacher')
    .innerJoinAndSelect('teacher.teacherProfile', 'profile')
    .where(switchLoginType2(loginType), { uniqueKey })
    .getOne();
  return res;
}

export async function findTeacherProfile(loginData: IloginData) {
  const { loginType, uniqueKey } = loginData;
  const res = await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'user.email', 'teacher.id'])
    .innerJoin('user.teacher', 'teacher')
    .innerJoinAndSelect('teacher.teacherProfile', 'profile')
    .leftJoinAndSelect('profile.profileImage', 'image')
    .leftJoinAndSelect('profile.yoga', 'yoga')
    .where(switchLoginType2(loginType), { uniqueKey })
    .getOne();
  if (res === undefined) {
    throw new Error('teacherProfile not found');
  }
  return res;
}

/* ***************
 * Create *
 *************** */

export async function createAndSaveTeacherProfile(
  data: teacherProfileType.data & teacherProfileType.join,
  teacher: DeepPartial<Teacher>
) {
  const manager = getManager();
  const profile = manager.create(TeacherProfile, { ...data, user: teacher });

  try {
    await manager.save(profile);
    return profile;
  } catch (error) {
    console.log(error);
    throw new Error('database error');
  }
}

export async function createProfileImage(TEACHER_PROFILE: Express.Multer.File[]) {
  const { fieldname, mimetype, path, size } = TEACHER_PROFILE[0];
  const profileImage = await createImage({
    fileType: mimetype,
    path,
    volume: size,
    category: swtichImageCategory(fieldname),
  });
  return profileImage;
}

/* ***************
 * Update *
 *************** */

export async function updateTeacherId(id: number | undefined, teacherProfile: DeepPartial<TeacherProfile>) {
  const academyRepo = getRepository(Teacher);
  await academyRepo.update({ id }, { teacherProfile });
}

export async function updateProfileImage(id: number | undefined, data: image.data) {
  const imageRepo = getRepository(Images);
  await imageRepo.update({ id }, { ...data });
}

export async function updateProfileImageId(id: number | undefined, profileImage: DeepPartial<Images>) {
  const teacherProfileRepo = getRepository(TeacherProfile);
  await teacherProfileRepo.update({ id }, { profileImage });
}

export async function updateProfile(profile: DeepPartial<TeacherProfile>, data: teacherProfileType.data) {
  const profileRepo = getRepository(TeacherProfile);
  const newData = dataCompareFunc(profile, data);
  if (!newData) {
    return;
  }
  await profileRepo.update({ id: profile.id }, newData);
}

/* ***************
 * Delete *
 *************** */
export async function deleteIntroduceImageById(id: number) {
  const manager = getManager();
  await manager.delete(Images, { id });
}

export async function deleteProfileImageID(teacherProfile: DeepPartial<TeacherProfile>) {
  const manager = getManager();
  await manager.createQueryBuilder().relation(TeacherProfile, 'profileImage').of(teacherProfile.id).set(Images);
  await manager.delete(Images, { id: teacherProfile.profileImage?.id });
}

export async function deleteProfileImage(teacherProfile: DeepPartial<TeacherProfile>) {
  const imageRepo = getRepository(Images);
  await imageRepo.delete({ teacherProfileImage: teacherProfile });
}

/* ***************
 * Middle Logic *
 *************** */

export async function createProfileImageLogic(TEACHER_PROFILE: Express.Multer.File[]) {
  const isProfile = TEACHER_PROFILE === undefined ? 'No' : 'Yes';

  if (isProfile === 'Yes') {
    const profileImage = await createProfileImage(TEACHER_PROFILE);
    return profileImage;
  }
  return undefined;
}

export async function updateProfileImageLogic(
  TEACHER_PROFILE: Express.Multer.File[],
  isDeleteProfileImage: string | undefined,
  teacherProfile: DeepPartial<TeacherProfile>
) {
  if (isDeleteProfileImage === 'true') {
    await deleteProfileImageID(teacherProfile);
    return;
  }
  if (TEACHER_PROFILE.length === 0) {
    return;
  }

  if (teacherProfile.profileImage === null) {
    const createdProfileImage = await createProfileImage(TEACHER_PROFILE);
    await updateProfileImageId(teacherProfile?.id, createdProfileImage);
  } else {
    await updateProfileImage(teacherProfile.profileImage?.id, {
      category: swtichImageCategory(TEACHER_PROFILE[0].fieldname),
      fileType: TEACHER_PROFILE[0].mimetype,
      path: TEACHER_PROFILE[0].path,
      volume: TEACHER_PROFILE[0].size,
    });
  }
}

/* ***************
 * Final Logic *
 *************** */

export async function createTeacherProfile(data: IteacherProfileRequest, loginData: IloginData) {
  const { name, introduce, instagram, TEACHER_PROFILE, yoga } = data;

  const findedTeacher = await findTeacher(loginData);

  const profileImage = await createProfileImageLogic(TEACHER_PROFILE);
  const yogaList = await createYogaList(yoga);
  const profile = await createAndSaveTeacherProfile(
    { name, introduce, instagram, profileImage, yoga: yogaList },
    findedTeacher.teacher
  );
  await updateTeacherId(findedTeacher.id, profile);
}

export async function updateTeacherProfile(data: IteacherProfileRequest, loginData: IloginData) {
  const { name, introduce, instagram, TEACHER_PROFILE, yoga, isDeleteProfileImage } = data;

  const findedProfileAllInfo = await findTeacherProfile(loginData);
  const profile = findedProfileAllInfo.teacher.teacherProfile;
  await updateYogaList(yoga, profile?.yoga, profile);
  await updateProfileImageLogic(TEACHER_PROFILE, isDeleteProfileImage, profile);
  await updateProfile(profile, { name, introduce, instagram });
}
