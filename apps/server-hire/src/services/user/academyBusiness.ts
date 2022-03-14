import AcademyBusiness from '@SH/Entities/user/academyBusiness';
import { databaseError } from '@Libs/constants/messages';
import { getManager, getRepository, DeepPartial } from 'typeorm';
import { businessInfoData } from '@Libs/interface/academy';
import Academy from '@SH/Entities/user/academy';

export default async function findAcademyBusiness(businessNumber: string) {
  const academyBusinessRepo = getRepository(AcademyBusiness);
  try {
    const res = await academyBusinessRepo.findOne({ where: { businessNumber } });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(databaseError.message);
  }
}

export async function createBusinessInfo(data: businessInfoData, findedAcademy: DeepPartial<Academy>) {
  const manager = getManager();
  const academyBusinessInfo = manager.create(AcademyBusiness, data);
  const academy = findedAcademy;
  academy.businessInfo = academyBusinessInfo;
  try {
    await manager.save(academyBusinessInfo);
    await manager.save(academy);
  } catch (error) {
    console.log(error);
  }
}
