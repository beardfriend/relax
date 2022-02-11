import { DeepPartial, getManager } from 'typeorm';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import Yoga from '@SH/Entities/yoga/yoga';

export default async function createAcademyProfile(
  academyName: string,
  address: {},
  introduce: string,
  representationNumber: string,
  yoga: DeepPartial<Yoga>[]
) {
  const manager = getManager();
  const academyProfile = manager.create(AcademyProfile, {
    academy_name: academyName,
    address,
    introduce,
    representation_number: representationNumber,
    yoga,
  });
  await manager.save(academyProfile);
}
