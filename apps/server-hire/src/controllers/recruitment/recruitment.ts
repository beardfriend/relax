import { recruitType, yogaSortType } from '@Libs/constants/types';
import { findAcademy } from '@SH/Services/user/academy';
import { RecruitmentDto } from '@Libs/dto/recruitment';
import {
  createNormalCondition,
  createRecruitment,
  createRecruitTimes,
  deleteRecruitment,
} from '@SH/Services/recruitment/recruitment';
import { Request, Response } from 'express';

export default async function postRecruitment(req: Request, res: Response) {
  const loginData = { uniqueKey: req.user, loginType: req.type };
  const { privilegeList, qualifications, taskIntroduction, normal }: RecruitmentDto = req.body;

  const findedAcademy = await findAcademy(loginData);
  const normalDatas = await Promise.all(
    normal.map(async (data) => {
      const time = await createRecruitTimes(data.time);
      const normalData = await createNormalCondition({
        ...data,
        time,
        yogaSort: yogaSortType.ACRO,
      });
      return normalData;
    })
  );

  await createRecruitment(
    {
      normal: normalDatas,
      privilegeList,
      qualifications,
      taskIntroduction,
      type: recruitType.NORMAL,
    },
    { writer: findedAcademy }
  );
  res.send('hello');
}

export async function delRecruitment(req: Request, res: Response) {
  const { id } = req.body;
  await deleteRecruitment(id);
  res.send('delete success');
}
