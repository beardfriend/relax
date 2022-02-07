import { business_check } from '@Libs/api/openapi';
import { Response, Request } from 'express';
import { getManager } from 'typeorm';
import AcademyProfile from '@SH/Entities/user/academyProfile';
import { envError } from '@Constants/Messages';
import { findAcademyProfile } from '@SH/Services/user/user';

export default async function businessCheck(req: Request, res: Response) {
  const { businessNumber, representationName, openDate } = req.body;
  if (process.env.OPEN_API_KEY === undefined) {
    return res.status(envError.statusCode).send({ msg: envError.message, category: envError.category });
  }
  try {
    const response = await business_check(
      { b_no: businessNumber, start_dt: openDate, p_nm: representationName },
      process.env.OPEN_API_KEY
    );
    if (response.status !== 400) {
      return res.send('존재하지 않는 사업자입니다.');
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { b_no, start_dt, p_nm } = response.data;

    const isAcademyProfile = findAcademyProfile(b_no);

    if (isAcademyProfile === undefined) {
      const manager = getManager();

      const academyProfile = new AcademyProfile();
      academyProfile.bussiness_number = b_no;
      academyProfile.representation_name = p_nm;
      academyProfile.open_date = start_dt;

      manager.save(academyProfile);
      return res.send('사업자 등록이 완료되었습니다');
    }
    return res.send('이미 등록된 사업자번호입니다. <br>고객센터로 문의 바랍니다.');
  } catch (error) {
    return res.send('erorr');
  }
}
