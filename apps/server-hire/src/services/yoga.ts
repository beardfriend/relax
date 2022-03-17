import { yogaSortType } from '@Libs/constants/types';
import { switchYogaType, switchYogaTypeReverse } from '@Libs/utils/switch';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import TeacherProfile from '@SH/Entities/user/teacherProfile';
import Yoga from '@SH/Entities/yoga/yoga';
import { DeepPartial, getManager } from 'typeorm';

async function createYoga(name: yogaSortType, key?: DeepPartial<AcademyProfile>) {
  const manager = getManager();
  const yoga = manager.create(Yoga, {
    name,
    academy: key,
  });
  await manager.save(yoga);
  return yoga;
}

export async function deleteYoga(id: number) {
  const manager = getManager();
  await manager.delete(Yoga, { id });
}

export async function deleteYogaALL(academyProfile: DeepPartial<AcademyProfile>) {
  const manager = getManager();
  await manager.delete(Yoga, { academy: academyProfile });
}

export async function createYogaList(
  yoga: string[] | undefined | string,
  key?: DeepPartial<AcademyProfile> | DeepPartial<TeacherProfile>
) {
  if (yoga === undefined) {
    return undefined;
  }
  let newYogaList = yoga;
  if (typeof newYogaList === 'string') {
    newYogaList = [newYogaList];
  }

  // const yogaList: DeepPartial<Yoga>[] = [];
  const yogaList = await Promise.all(
    newYogaList.map((data) => {
      return createYoga(switchYogaType(data), key);
    })
  );
  return yogaList;
}

export async function updateYogaList(
  newYogaList: string[] | string | undefined,
  beforeYogaList: DeepPartial<Yoga>[],
  profile: DeepPartial<AcademyProfile> | DeepPartial<TeacherProfile>
) {
  // 중복이 없으면, 전체 삭제 후 새로운 리스트 업데이트
  // 중복이 있으면, 중복된 것 남기고 나머지 지우고 새로운 것들 업데이트
  // 빈 값이면, 전체 삭제
  let yogaList = newYogaList;
  if (typeof yogaList === 'string') {
    yogaList = [yogaList];
  }
  if (yogaList === undefined) {
    await deleteYogaALL(profile);
    return;
  }

  const beforeList: string[] = [];

  const Deletelist = beforeYogaList.filter((yoga) => {
    if (yoga.name === undefined || yogaList === undefined) {
      return undefined;
    }
    const yoganame = switchYogaTypeReverse(yoga.name) as string;
    beforeList.push(yoganame);
    return !yogaList.includes(yoganame);
  });

  const updateList = yogaList.filter((data) => {
    return !beforeList.includes(data);
  });

  Deletelist.map(async (data) => {
    if (data.id === undefined) {
      return;
    }
    await deleteYoga(data.id);
  });
  await createYogaList(updateList, profile);
}

export default createYoga;
