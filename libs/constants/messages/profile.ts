import { response } from '@Libs/interface/response';

export const getProfileSuccess: response = {
  statusCode: 200,
  category: 'profile',
  message: '선생님 프로필 요청에 성공하였습니다.',
};

export const createProfileSuccess: response = {
  statusCode: 200,
  category: 'profile',
  message: '선생님 프로필 생성요청에 성공하였습니다.',
};

export const updateProfileSuccess: response = {
  statusCode: 200,
  category: 'profile',
  message: '선생님 프로필이 수정요청에 성공하였습니다.',
};
