import { response } from '@Libs/interface/response';

export const loginSuccess: response = {
  statusCode: 200,
  category: 'user',
  message: '로그인에 성공했습니다.',
};

export const noUser: response = {
  statusCode: 400,
  category: 'user',
  message: '존재하지 않는 아이디입니다.',
};

export const incorrectPassword: response = {
  statusCode: 400,
  category: 'user',
  message: '비밀번호가 일치하지 않습니다.',
};
