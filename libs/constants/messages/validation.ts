import { response } from '@Libs/interface/response';

export const validationError: response = {
  statusCode: 400,
  category: 'validation',
  message: '데이터베이스 형식과 일치하지 않습니다.',
};
