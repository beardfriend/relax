import { INormalCondition, IRecruitment, IRecruitTime } from '@Libs/interface/recruitment';
import NormalCondition from '@SH/Entities/recruitment/normalCondition';
import Recruitment from '@SH/Entities/recruitment/recruitment';
import RecruitTime from '@SH/Entities/recruitment/recruitTime';
import Academy from '@SH/Entities/user/academy';
import { DeepPartial, getRepository } from 'typeorm';
/* ***************
 * Find *
 *************** */
export function main() {
  console.log('hello');
}
export function test() {
  console.log('hello');
}

/* ***************
 * Create *
 *************** */
export async function createRecruitTime(data: IRecruitTime) {
  const normalRepo = getRepository(RecruitTime);
  const time = normalRepo.create(data);
  await normalRepo.save(time);
  return time;
}

export async function createNormalCondition(data: INormalCondition) {
  const normalRepo = getRepository(NormalCondition);
  const normal = normalRepo.create(data);
  await normalRepo.save(normal);
  return normal;
}

export async function createRecruitment(data: IRecruitment.normal, key: IRecruitment.join) {
  const recruitRepo = getRepository(Recruitment);
  const recruitment = recruitRepo.create({ ...data, writer: key.writer });
  await recruitRepo.save(recruitment);
}

/* ***************
 * Update *
 *************** */

export async function updateRecruitWriter(academy: DeepPartial<Academy>, id: number) {
  const recruitRepo = getRepository(Recruitment);
  await recruitRepo.update({ id }, { writer: academy });
}

/* ***************
 * Delete *
 *************** */

export async function deleteRecruitment(id: number) {
  const recruitRepo = getRepository(Recruitment);
  await recruitRepo.delete({ id });
}

/* ***************
 * Middle Logic *
 *************** */

export async function createRecruitTimes(data: IRecruitTime[]) {
  const times = await Promise.all(
    data.map(async (time) => {
      const result = await createRecruitTime(time);
      return result;
    })
  );
  return times;
}

/* ***************
 * Final Logic *
 *************** */
