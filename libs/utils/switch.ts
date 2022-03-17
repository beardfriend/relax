import { imageType, yogaSortType } from '@Libs/constants/types';

export function switchYogaType(key: string) {
  switch (key) {
    case 'IYENGAR':
      return yogaSortType.IYENGAR;
    case 'HATA':
      return yogaSortType.HATA;
    case 'ASHTANGA':
      return yogaSortType.ASHTANGA;
    case 'FLYING':
      return yogaSortType.FLYING;
    default:
      throw new Error('존재하지 않는 타입입니다.');
  }
}

export function switchYogaTypeReverse(key: yogaSortType) {
  switch (key) {
    case yogaSortType.IYENGAR:
      return 'IYENGAR';
    case yogaSortType.HATA:
      return 'HATA';
    case yogaSortType.ASHTANGA:
      return 'ASHTANGA';
    case yogaSortType.FLYING:
      return 'FLYING';
    default:
      throw new Error('존재하지 않는 타입입니다.');
  }
}

export function swtichImageCategory(key: string) {
  switch (key) {
    case 'ACADEMY_LOGO':
      return imageType.ACADEMY_LOGO;
    case 'TEACHER_PROFILE':
      return imageType.TEACHER_PROFILE;
    case 'ACADEMY_INTRODUCE':
      return imageType.ACADEMY_INTRODUCE;
    case 'RESUME_INTROUDCE':
      return imageType.RESUME_INTROUDCE;
    default:
      throw new Error('존재하지 않는 타입입니다.');
  }
}

export function swtichLoginType(uniqueKey: string | number, loginType: 'normal' | 'kakao' | 'google') {
  if (loginType === 'google') {
    return { google_id: uniqueKey };
  }
  if (loginType === 'kakao') {
    return { kakao_id: uniqueKey };
  }
  return { email: uniqueKey };
}

export function switchLoginType2(loginType: 'normal' | 'kakao' | 'google') {
  if (loginType === 'google') {
    return 'user.google_id =:uniqueKey';
  }
  if (loginType === 'kakao') {
    return 'user.kakao_id =:uniqueKey';
  }
  return 'user.email =:uniqueKey';
}

export function swtichEnv(key: string) {
  switch (key) {
    case 'production':
      return `../../config/.env.production`;
    case 'development':
      return `../../config/.env.development`;
    case 'test':
      return `./config/.env.test`;

    default:
      throw new Error('존재하지 않는 타입입니다.');
  }
}
