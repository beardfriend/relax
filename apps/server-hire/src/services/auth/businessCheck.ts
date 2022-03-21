/* eslint-disable @typescript-eslint/naming-convention */
import { business_check } from '@Libs/api/openapi';
import { IbusinessInfoRequest } from '@Libs/interface/academy';
import env from '@SH/env';
import { IloginData } from '@Libs/interface/user';
import { findUser } from '../user/user';
import { createAcademy } from '../user/academy';
import { createBusinessInfo } from '../user/academyBusiness';

export async function businessStatusFunc(data: IbusinessInfoRequest) {
  const { businessNumber, representationName, openDate } = data;
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

  const isAvailableBusiness = valid === '01';

  return { isAvailableBusiness, businessInfoData: request_param as { b_no: string; p_nm: string; start_dt: string } };
}

export async function createAcademyBusiness(
  businessInfoData: IbusinessInfoRequest,
  { uniqueKey, loginType }: IloginData
) {
  const user = await findUser(uniqueKey, loginType);

  if (user === undefined) {
    throw new Error('user undefined');
  }

  const academy = await createAcademy(user);
  await createBusinessInfo(businessInfoData, academy);
}
