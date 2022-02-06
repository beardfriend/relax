import { response } from '@Libs/interface/response';

export const verfiyError: response = {
  statusCode: 400,
  category: 'jwt',
  message: '토큰 인증에 실패했습니다.',
};
