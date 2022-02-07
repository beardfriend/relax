import axios from 'axios';
import { getCodeData, getTokenData } from '@Libs/interface/googleAuth';

const baseURL = 'https://accounts.google.com/';
const oAuthURL = 'https://oauth2.googleapis.com/';
const apiURL = 'https://www.googleapis.com/';

export async function goolge_authcode(data: getCodeData) {
  const result = await axios({
    method: 'post',
    baseURL: baseURL,
    url: `o/oauth2/v2/auth`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    params: data,
  });
  return result;
}

export async function google_getToken(data: getTokenData) {
  const result = await axios({
    method: 'post',
    baseURL: oAuthURL,
    url: `token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    params: data,
  });
  return result;
}
