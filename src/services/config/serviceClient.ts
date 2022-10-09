import axios, {AxiosResponse} from 'axios';

export const BASE_URL = 'https://api.spotify.com/v1';
export const AUTH =
  'Bearer BQDlGX5ogkIS6QBy6BvACTTqH2AW3E2dUbYdBdDeHCfYf2DpAX7xJ6XFdBp8jqZgNuwoIzFtOdwENzv2YlLisbuI8L5nu_tBSVFx5wdXs4E24HQnPio';

export const axiosInstanceSpotify = axios.create({
  baseURL: BASE_URL,
});

export const getRequest = async <T>(internalUri: string, queryParams: any) => {
  const response = await axiosInstanceSpotify.get<
    any,
    AxiosResponse<any, T | T[]>
  >(internalUri, {
    headers: {
      Authorization: AUTH,
    },
    params: {
      ...queryParams,
    },
  });

  return response.data;
};
