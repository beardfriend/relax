import { yogaSortType } from '@Libs/constants/types';
import AcademyProfile from '@SH/Entities/user/academyProfile';
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

export default createYoga;
