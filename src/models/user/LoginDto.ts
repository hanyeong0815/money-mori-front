export default interface loginRes {
  username: string | null | undefined;
  nickname: string | null | undefined;
  tokenPair: tokenPair;
}

export interface tokenPair {
  accessToken: string;
  refreshToken: string;
}
