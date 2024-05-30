import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  TokenStore,
  TokenCache,
} from '@commercetools/sdk-client-v2';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');
const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

const LOCAL_STORAGE_TOKEN_KEY = 'key-token';

class MyTokenCache implements TokenCache {
  myCaсhe: TokenStore = { token: '', expirationTime: 1800, refreshToken: '' };

  set(newCache: TokenStore) {
    this.myCaсhe = newCache;
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(newCache));
  }

  get() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      this.myCaсhe = JSON.parse(token);
    }
    return this.myCaсhe;
  }
}

const tokenCache = new MyTokenCache();

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

export const createAnonymousClient = () => {
  const options: AnonymousAuthMiddlewareOptions = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      anonymousId: crypto.randomUUID(),
    },
    scopes,
    fetch,
  };
  const clientNew = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return clientNew;
};

export const createRefreshTokenClient = (refreshToken: string) => {
  const options: RefreshAuthMiddlewareOptions = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    refreshToken,
    tokenCache,
    fetch,
  };
  const clientNew = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(options)
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
