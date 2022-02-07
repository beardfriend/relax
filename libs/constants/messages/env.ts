import { response } from '@Libs/interface/response';

export const envError: response = {
  statusCode: 500,
  category: 'env',
  message: 'ENV파일이 존재하지 않습니다.',
};
