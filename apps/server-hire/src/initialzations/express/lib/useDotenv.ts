import dotenv from 'dotenv';

const useDotenv = () => {
  dotenv.config({
    path: `../../config/${process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'}`,
  });
};

export default useDotenv;
