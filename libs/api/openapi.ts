import { businessCheckData } from '@Libs/interface/openAPI';
import axios from 'axios';

const baseURL = 'https://api.odcloud.kr/api/nts-businessman/v1';

export async function business_check(data: businessCheckData, key: string) {
  const result = await axios({
    method: 'post',
    baseURL: baseURL,
    url: `validate?serviceKey=${key}&returnType=JSON`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    params: data,
  });
  return result;
}
