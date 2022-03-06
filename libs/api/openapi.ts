import { businessCheckData } from '@Libs/interface/openAPI';
import axios from 'axios';
import { axiosError } from '@Libs/constants/messages';

const baseURL = 'http://api.odcloud.kr/';

export async function business_check(data: businessCheckData, key: string) {
  try {
    const result = await axios({
      method: 'post',
      baseURL: baseURL,
      url: `api/nts-businessman/v1/validate?serviceKey=${key}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`${axiosError.message} , openAPI businessCheck`);
  }
}
