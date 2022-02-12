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

export const businessCheckSuccess: response = {
  statusCode: 200,
  category: 'user',
  message: '사업자 등록이 완료되었습니다.',
};

export const businessAlreadyExist: response = {
  statusCode: 403,
  category: 'user',
  message: 'Relax에 이미 가입된 사업자 번호입니다.<br> 고객센터로 문의하시길 바랍니다.',
};

export const businessCheckFail: response = {
  statusCode: 200,
  category: 'user',
  message: '존재하지 않는 사업자입니다. <br> 사업자 번호 또는 대표자명 또는 개업일자를 확인해주세요. ',
};
