import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  // TokenCache,
  // TokenStore,
} from '@commercetools/sdk-client-v2';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

// class MyTokenCache implements TokenCache {
//   myCaсhe: TokenStore = { token: '', expirationTime: 1800, refreshToken: '' };

//   set(newCache: TokenStore) {
//     this.myCaсhe = newCache;
//   }

//   get() {
//     return this.myCaсhe;
//   }
// }

// const tokenCacheMy = new MyTokenCache();

// type AnonymousAuthMiddlewareOptions = {
//   host: string;
//   projectKey: string;
//   credentials: {
//     clientId: string;
//     clientSecret: string;
//     anonymousId?: string;
//   };
//   scopes?: Array<string>;
//   oauthUri?: string;
//   fetch?: any;
//   // tokenCache?: TokenCache;
// };

const options = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    anonymousId: crypto.randomUUID(), // a unique id
  },
  scopes,
  fetch,
  // tokenCache: tokenCacheMy,
};

type PasswordAuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    user: {
      username: string;
      password: string;
    };
  };
  scopes?: Array<string>;
  // tokenCache?: TokenCache;
  oauthUri?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch?: any;
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const anonymousClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

function createPasswordFlow() {
  const optionsPassword: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: 'test@test.com',
        password: '12345678',
      },
    },
    scopes,
    fetch,
    // tokenCache: tokenCacheMy,
  };
  const passwordClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(optionsPassword)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  console.log(passwordClient);
  return passwordClient;
}
// export default ctpClient;

export { ctpClient, anonymousClient, createPasswordFlow };
