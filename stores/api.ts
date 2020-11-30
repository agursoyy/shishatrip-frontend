import Axios from 'axios';
import getConfig from 'next/config';
//import { setAuthStore } from './auth/actions'; DO NOT FORGET THIS.
import { Console } from 'console';
import { destroyCookie, setCookie } from 'nookies';
const {
  publicRuntimeConfig: { api },
} = getConfig();
import queryString from 'query-string';

let FIRSTREQUEST = true;
const fetch = async (
  {
    url = '',
    method = 'get',
    form,
    auth = true,
    headers,
    accessToken,
    refreshToken,
    dispatch,
  }: {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    form?: {
      [x: string]: any;
    };
    auth?: boolean;
    headers?: any;
    accessToken?: string;
    refreshToken?: string;
    dispatch?: any;
  },
  expected?: number,
): Promise<any> => {
  let config: { data?: any; headers: any; method: typeof method; url: string } = {
    data: {},
    headers: headers ? { ...headers } : {},
    method,
    url: `${api}${url}`,
  };
  if (method === 'get')
    config = {
      headers: {},
      method,
      url: `https://api.mocki.io/v1/ae9a2089`,
    };

  if (form && Object.keys(form).length > 0) {
    if (method === 'get') {
      config.url += config.url.indexOf('?') === -1 ? '?' : '';
      config.url += config.url.indexOf('=') > -1 ? '&' : '';
      config.url += queryString.stringify(form, { arrayFormat: 'bracket' });
    } else {
      config.data = form;
    }
  }

  if (auth) {
    config.headers = {
      ...config.headers,
      Authorization: `JWT ${accessToken}`,
    };
  }

  // tslint:disable-next-line: no-console
  console.log(config);
  return await Axios(config)
    .then(({ data, status }) => {
      FIRSTREQUEST = true;
      return expected ? (expected === status ? data : null) : { data, status };
    })
    .catch(async (err) => {
      console.log(err.response.data);
      if (auth && err.response && err.response.status === 401) {
        if (refreshToken && FIRSTREQUEST) {
          console.log(accessToken);

          const newAccessToken: { access: string } = await Axios.post(`${api}/auth/jwt/refresh/`, {
            refresh: refreshToken,
          }).then((res) => res.data);
          if (newAccessToken) {
            console.log(newAccessToken);
            //await dispatch(setAuthStore(newAccessToken.access, refreshToken!));
            FIRSTREQUEST = false;
            return await fetch({
              url,
              method,
              form,
              auth,
              accessToken: newAccessToken.access,
              refreshToken,
              dispatch,
            });
          }
        }
      } else
        throw expected
          ? expected === err.response.status
            ? err.response.data
            : null
          : { data: err.response.data, status: err.response.status };
    });
};

export default fetch;
