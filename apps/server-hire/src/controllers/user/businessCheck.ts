/* eslint-disable @typescript-eslint/naming-convention */
import { business_check } from '@Libs/api/openapi';
import { Response, Request } from 'express';
import { getManager } from 'typeorm';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import { envError } from '@Constants/Messages';
import { findAcademyProfile, findUser } from '@SH/Services/user/user';

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
      return res.send('axios return value 없음');
    }

    const { valid, request_param } = response.data.data[0];
    if (valid === '01') {
      const { b_no, start_dt, p_nm } = request_param;
      const isAcademyProfile = await findAcademyProfile(b_no);

      if (isAcademyProfile === undefined) {
        if (req.user === undefined || req.type === undefined) {
          return res.send('login check middleware error');
        }

        const user = await findUser(req.user, req.type);
        console.log(user?.teacher_profile);
        if (user === undefined) {
          return res.send('login check middleware error');
        }
        const manager = getManager();

        const academyProfile = new AcademyProfile();
        academyProfile.bussiness_number = b_no;
        academyProfile.representation_name = p_nm;
        academyProfile.open_date = start_dt;
        await manager.save(academyProfile);
        user.academy_profile = academyProfile;
        await manager.save(user);

        return res.send('사업자 등록이 완료되었습니다');
      }
      return res.send('이미 등록된 사업자번호입니다. <br>고객센터로 문의 바랍니다.');
    }
    return res.send('존재하지 않는 사업자입니다.');
  } catch (error) {
    return res.send('erorr');
  }
}
