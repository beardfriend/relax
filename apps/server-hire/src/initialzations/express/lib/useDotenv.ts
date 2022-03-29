import dotenv from 'dotenv';
import { swtichEnv } from '@Libs/utils/switch';

const useDotenv = () => {
  if (process.env.NODE_ENV === undefined) {
    throw new Error("NODE ENV DOESN'T EXSIST");
  }

  dotenv.config({ path: swtichEnv(process.env.NODE_ENV) });
};

export default useDotenv;
