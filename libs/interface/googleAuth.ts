export interface getCodeData {
  client_id: string;
  redirect_uri: string;
  response_type: 'code';
  scope: string;
  access_type: string;
}

export interface getTokenData {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  code: string;
  grant_type: 'authorization_code';
}
