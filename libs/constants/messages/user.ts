import { response } from '@Libs/interface/response';

export const loginSuccess: response = {
  statusCode: 200,
  category: 'user',
  message: '로그인에 성공했습니다.',
};

export const signupSuccess: response = {
  statusCode: 200,
  category: 'user',
  message: '회원가입에 성공하였습니다.',
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

export const existEmail: response = {
  statusCode: 400,
  category: 'user',
  message: '이미 존재하는 이메일입니다.',
};

export const userInfoNotfound: response = {
  statusCode: 400,
  category: 'user',
  message: '유저가 존재하지 않습니다.',
};

export const userTypeSelect: response = {
  statusCode: 200,
  category: 'user',
  message: '회원 유형이 성공적으로 등록되었습니다.',
};
