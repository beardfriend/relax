import { getOsEnv, toBool, toNumber } from '@Libs/utils/env';
import useDotEnv from '@SH/Initializations/express/lib/useDotenv';

useDotEnv();

const env = {
  port: toNumber(getOsEnv('EXPRESS_PORT')),
  typeorm: {
    connection: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnv('TYPEORM_HOST'),
    port: toNumber(getOsEnv('TYPEORM_PORT')),
    username: getOsEnv('TYPEORM_USERNAME'),
    password: getOsEnv('TYPEORM_PASSWORD'),
    database: getOsEnv('TYPEORM_DATABASE'),
    sync: toBool(getOsEnv('TYPEORM_SYNCHRONIZE')),
    logging: toBool(getOsEnv('TYPEORM_LOGGING')),
    entities: getOsEnv('TYPEORM_ENTITIES'),
    migration: getOsEnv('TYPEORM_MIGRATION'),
  },
  jwt: getOsEnv('JWT'),

  google: {
    key: getOsEnv('GOOGLE_KEY'),
    password: getOsEnv('GOOGLE_PASS'),
    redirect_uri: getOsEnv('GOOGLE_REDIRECT_URI'),
    finish_uri: getOsEnv('GOOGLE_FINISH_URI'),
  },
  kakao: {
    key: getOsEnv('KAKAO_KEY'),
    redirect_uri: getOsEnv('KAKAO_REDIRECT_URI'),
    finish_uri: getOsEnv('KAKAO_FINISH_URI'),
  },
  api: {
    business_check: getOsEnv('OPEN_API_KEY'),
  },
};

export default env;
