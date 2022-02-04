import { response } from '@Libs/interface/response';

export const serverError: response = {
  statusCode: 500,
  category: 'server',
  message: '서버 에러',
};
