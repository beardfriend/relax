import axios from 'axios';
import { getCodeData, getTokenData } from '@Libs/interface/googleAuth';
import { axiosError } from '@Libs/constants/messages/axios';

const baseURL = 'https://accounts.google.com/';
const oAuthURL = 'https://oauth2.googleapis.com/';

export async function goolge_authcode(data: getCodeData) {
  try {
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
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message}, GOOGLE Get AuthCode API `);
  }
}

export async function google_getToken(data: getTokenData) {
  try {
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
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message}, GOOGLE Get Token API `);
  }
}
