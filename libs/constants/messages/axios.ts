import { response } from '@Libs/interface/response';

export const axiosBasic: response = {
  statusCode: 404,
  category: 'axios',
  message: 'axios 에러',
};

export const axiosReturn: response = {
  statusCode: 404,
  category: 'axios',
  message: 'axios로부터 값이 제대로 넘어오지 않았습니다.',
};
