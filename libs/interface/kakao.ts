export interface getTokenData {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}

export interface tokenUpdateData {
  grant_type: string;
  client_id: string;
  refresh_token: string;
}
