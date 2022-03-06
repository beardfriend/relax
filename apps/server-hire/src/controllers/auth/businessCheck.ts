import {
  requsetBodyNotFound,
  businessCheckFail,
  businessCheckSuccess,
  businessAlreadyExist,
} from '@Constants/Messages';
import env from '@SH/env';
import { business_check } from '@Libs/api/openapi';
import { findUser } from '@SH/Services/user/user';
import { Request, Response } from 'express';
import findAcademyBusiness, { createBusinessInfo } from '@SH/Services/user/academyBusiness';
import { createAcademy } from '@SH/Services/user/academy';

export default async function businessCheck(req: Request, res: Response) {
  const { businessNumber, representationName, openDate } = req.body;

  try {
    const response = await business_check(
      {
        businesses: [
          {
            b_no: businessNumber as string,
            p_nm: representationName as string,
            start_dt: openDate as string,
          },
        ],
      },
      env.api.business_check
    );

    const { valid, request_param } = response.data.data[0];

    if (valid === '01') {
      const { b_no, start_dt, p_nm } = request_param;
      const isAcademyProfile = await findAcademyBusiness(b_no);

      if (isAcademyProfile === undefined) {
        const user = await findUser(req.user, req.type);

        if (user === undefined) {
          return res
            .status(requsetBodyNotFound.statusCode)
            .send({ msg: requsetBodyNotFound.message, cateogry: requsetBodyNotFound.category });
        }

        const academy = await createAcademy(user);
        await createBusinessInfo(
          {
            businessNumber: b_no,
            representationName: start_dt,
            openDate: p_nm,
          },
          academy
        );

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
    return res.status(500).send('business check error');
  }
}
