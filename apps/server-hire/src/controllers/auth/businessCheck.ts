/* eslint-disable @typescript-eslint/naming-convention */
import { businessAlreadyExist, businessCheckFail, businessCheckSuccess } from '@Constants/Messages';
import { IbusinessInfoRequest } from '@Libs/interface/academy';
import { businessStatusFunc, createAcademyBusiness } from '@SH/Services/auth/businessCheck';
import findAcademyBusiness from '@SH/Services/user/academyBusiness';
import { Request, Response } from 'express';

export default async function businessCheck(req: Request, res: Response) {
  const businessData: IbusinessInfoRequest = req.body;

  try {
    const { businessInfoData, isAvailableBusiness } = await businessStatusFunc(businessData);

    if (isAvailableBusiness) {
      const isAlreadyAcademyBusiness = await findAcademyBusiness(businessInfoData.b_no);

      if (!isAlreadyAcademyBusiness) {
        await createAcademyBusiness(businessData, { uniqueKey: req.user, loginType: req.type });
        return res
          .status(businessCheckSuccess.statusCode)
          .send({ msg: businessCheckSuccess.message, category: businessCheckSuccess.category });
      }

      return res
        .status(businessAlreadyExist.statusCode)
        .send({ msg: businessAlreadyExist.message, category: businessAlreadyExist.category });
    }

    return res
      .status(businessCheckFail.statusCode)
      .send({ msg: businessCheckFail.message, category: businessCheckFail.category });
  } catch (error) {
    console.log(error);
    return res.status(500).send('business check error');
  }
}
