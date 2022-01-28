import dotenv from 'dotenv';

function dotEnvSwitch(value: string | undefined) {
  let result = '';
  switch (value) {
    case 'development':
      result = '.env.development';
      break;
    case 'production':
      result = '.env.production';
      break;
    case 'test':
      result = '.env.test';
      break;
    default:
      break;
  }
  return result;
}
const useDotenv = () => {
  dotenv.config({
    path: `../../config/${dotEnvSwitch(process.env.NODE_ENV)}`,
  });
};

export default useDotenv;
