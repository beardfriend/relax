import axios from 'axios';
import { axiosError } from '@Libs/constants/messages';
import { getTokenData, tokenUpdateData } from '../interface/kakao';

const baseURL = 'https://kauth.kakao.com/';
const apiURL = 'https://kapi.kakao.com/';
export async function kakao_authCode(kakaoKey: string, redirect_uri: string) {
  try {
    const result = await axios({
      method: 'get',
      baseURL: baseURL,
      url: `oauth/authorize?client_id=${kakaoKey}&redirect_uri=${redirect_uri}&response_type=code`,
      headers: {
        'Content-Type': 'text/html',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message}, KAKAO Get Auth CODE API `);
  }
}
export async function kakao_getToken(data: getTokenData) {
  try {
    const result = await axios({
      method: 'post',
      baseURL: baseURL,
      url: `oauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      params: data,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message}, KAKAO Get TOKEN API `);
  }
}

export async function kakao_token_update(data: tokenUpdateData) {
  try {
    const result = await axios({
      method: 'post',
      baseURL: baseURL,
      url: `oauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      params: data,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message}, KAKAO Update TOKEN API `);
  }
}

export async function kakao_getUserData(token: string) {
  try {
    const result = await axios({
      method: 'get',
      baseURL: apiURL,
      url: `v2/user/me`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message}, KAKAO Get UserData API `);
  }
}
