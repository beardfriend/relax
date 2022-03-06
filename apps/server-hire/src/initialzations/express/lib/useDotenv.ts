import dotenv from 'dotenv';
import { swtichEnv } from '@Libs/utils/switch';

const useDotenv = () => {
  if (process.env.NODE_ENV === undefined) {
    throw new Error("NODE ENV DOESN'T EXSIST");
  }
  console.log(process.env.NODE_ENV);
  dotenv.config({ path: swtichEnv(process.env.NODE_ENV) });
};

export default useDotenv;
