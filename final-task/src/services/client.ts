import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  TokenStore,
  TokenCache,
} from '@commercetools/sdk-client-v2';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');
const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

const LOCAL_STORAGE_TOKEN_KEY = 'key-token';

const tokenCache: TokenCache = {
  get: () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return token ? JSON.parse(token) : null;
  },
  set: (cache: TokenStore) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(cache));
  },
};

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: hostAuth,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  tokenCache,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

export const createPasswordClient = (email: string, password: string) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
      },
    },
    scopes,
    tokenCache,
    fetch,
  };
  const clientNew = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return clientNew;
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
