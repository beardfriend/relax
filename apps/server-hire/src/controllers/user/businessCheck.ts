/* eslint-disable @typescript-eslint/naming-convention */
import {
  envError,
  requsetBodyNotFound,
  businessCheckFail,
  businessCheckSuccess,
  businessAlreadyExist,
} from '@Constants/Messages';
import { business_check } from '@Libs/api/openapi';
import { axiosReturn } from '@Libs/constants/messages/axios';
import { createAcademy, createAcademyBusiness } from '@SH/Services/user/academy';
import { findAcademyBusiness, findUser } from '@SH/Services/user/user';
import { Request, Response } from 'express';

export default async function businessCheck(req: Request, res: Response) {
  const { businessNumber, representationName, openDate } = req.body;
  if (process.env.OPEN_API_KEY === undefined) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }

  try {
    const response = await business_check(
      {
        businesses: [
          {
            b_no: businessNumber as string,
            start_dt: representationName as string,
            p_nm: openDate as string,
          },
        ],
      },
      process.env.OPEN_API_KEY
    );

    if (response === undefined) {
      return res.status(axiosReturn.statusCode).send({ msg: axiosReturn.message, category: axiosReturn.category });
    }

    const { valid, request_param } = response.data.data[0];

    if (valid === '01') {
      const { b_no, start_dt, p_nm } = request_param;
      const isAcademyProfile = await findAcademyBusiness(b_no);

      if (isAcademyProfile === undefined) {
        if (req.user === undefined || req.type === undefined) {
          return res
            .status(requsetBodyNotFound.statusCode)
            .send({ msg: requsetBodyNotFound.message, cateogry: requsetBodyNotFound.category });
        }

        const user = await findUser(req.user, req.type);

        if (user === undefined) {
          return res
            .status(requsetBodyNotFound.statusCode)
            .send({ msg: requsetBodyNotFound.message, cateogry: requsetBodyNotFound.category });
        }

        const academyBusiness = await createAcademyBusiness(b_no, p_nm, start_dt);
        await createAcademy(academyBusiness, user);

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
    return res.send('erorr');
  }
}
