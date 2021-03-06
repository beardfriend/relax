import { response } from '@Libs/interface/response';

export const getProfileSuccess: response = {
  statusCode: 200,
  category: 'profile',
  message: '학원 프로필 요청에 성공하였습니다.',
};

export const createProfileSuccess: response = {
  statusCode: 201,
  category: 'profile',
  message: '학원 프로필 생성요청에 성공하였습니다.',
};

export const updateProfileSuccess: response = {
  statusCode: 201,
  category: 'profile',
  message: '학원 프로필 수정요청에 성공하였습니다.',
};

export const getTeacherProfileSuccess: response = {
  statusCode: 200,
  category: 'profile',
  message: '선생님 프로필 요청에 성공하였습니다.',
};

export const createTeacherProfileSuccess: response = {
  statusCode: 201,
  category: 'profile',
  message: '선생님 프로필 생성요청에 성공하였습니다.',
};

export const updateTeacherProfileSuccess: response = {
  statusCode: 201,
  category: 'profile',
  message: '선생님 프로필이 수정요청에 성공하였습니다.',
};
