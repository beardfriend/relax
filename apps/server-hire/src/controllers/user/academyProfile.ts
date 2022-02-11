import { Response, Request } from 'express';
import { profileData } from '@Libs/interface/academy';
import createAddress from '@SH/Services/address';
import createAcademyProfile from '@SH/Services/user/academy';
import createYoga from '@SH/Services/yoga';

export default async function academyProfile(req: Request, res: Response) {
  const { academyName, introduce, address, representationNumber, yogaType }: profileData = req.body;
  const createdAddress = await createAddress(address);
  const createdYoga = await createYoga(yogaType);
  await createAcademyProfile(academyName, createdAddress, introduce, representationNumber, [createdYoga]);
  return res.send('succes');
}
