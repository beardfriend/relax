import { response } from '@Libs/interface/response';

export const envError: response = {
  statusCode: 500,
  category: 'auth',
  message: 'ENV파일이 존재하지 않습니다.',
};

export const accessRefreshNotFound: response = {
  statusCode: 302,
  category: 'auth',
  message: 'accessToken, RefreshToken이 존재하지 않습니다. 로그인 페이지로 이동해주세요.',
};

export const requestTokenNotfound: response = {
  statusCode: 400,
  category: 'auth',
  message: '로그인시 요청한 token이 정상적으로 넘어오지 않았습니다.',
};
