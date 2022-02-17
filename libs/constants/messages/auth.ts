import { response } from '@Libs/interface/response';

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

export const requsetBodyNotFound: response = {
  statusCode: 400,
  category: 'auth',
  message: '미들웨어로부터 request값이 넘어오지 않았습니다.',
};

export const alreadyAccessToken: response = {
  statusCode: 400,
  category: 'auth',
  message: '이미 access토큰이 존재합니다.',
};

export const googleCodeNotFound: response = {
  statusCode: 400,
  category: 'auth',
  message: '토큰발급을 위한 구글코드가 넘어오지 않았습니다.',
};

export const cookieNotFound: response = {
  statusCode: 400,
  category: 'auth',
  message: '쿠키가 존재하지 않습니다.',
};

export const tokenNotfound: response = {
  statusCode: 400,
  category: 'auth',
  message: '토큰이 존재하지 않습니다.',
};
