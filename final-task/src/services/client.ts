import fetch from 'node-fetch';
import {
  ClientBuilder,
  // type AuthMiddlewareOptions,
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
  myCache: TokenStore = { token: '', expirationTime: 1800, refreshToken: '' };

  set(newCache: TokenStore) {
    this.myCache = newCache;
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(newCache));
  }

  get() {
    return this.myCache;
  }
}

let tokenCache = new MyTokenCache();

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

export const createPasswordClient = (email: string, password: string) => {
  console.log('passwordTokenFlow');
  if (!localStorage.getItem('userCreds')) {
    tokenCache = new MyTokenCache();
  }
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
  console.log('anonymousTokenFlow');
  const anonymousId = crypto.randomUUID();
  localStorage.setItem('anonymousId', anonymousId);
  const options: AnonymousAuthMiddlewareOptions = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      anonymousId,
    },
    tokenCache,
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
  console.log('refreshTokenFlow');
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

export const createExistingTokenClient = (token: string) => {
  console.log('existingTokenFlow');
  const rightToken = `Bearer ${token}`;
  type ExistingTokenMiddlewareOptions = {
    force?: boolean;
  };
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  const clientNew = new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(rightToken, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return clientNew;
};
