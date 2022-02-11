import { yogaSortType } from '@Libs/constants/types';
import Yoga from '@SH/Entities/yoga/yoga';
import { getManager } from 'typeorm';

async function createYoga(name: yogaSortType) {
  const manager = getManager();
  const yoga = manager.create(Yoga, {
    name,
  });
  await manager.save(yoga);
  return yoga;
}

export default createYoga;
