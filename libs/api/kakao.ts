import axios from 'axios';
import { getTokenData, tokenUpdateData } from '../interface/kakao';

const baseURL = 'https://kauth.kakao.com/';
const apiURL = 'https://kapi.kakao.com/';
export async function kakao_authCode(clientId: string, redirect_uri: string) {
  const result = await axios({
    method: 'get',
    baseURL: baseURL,
    url: `oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code`,
    headers: {
      'Content-Type': 'text/html',
    },
  });
  return result;
}
export async function kakao_getToken(data: getTokenData) {
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
}

export async function kakao_token_update(data: tokenUpdateData) {
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
}

export async function kakao_getUserData(token: string) {
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
}
