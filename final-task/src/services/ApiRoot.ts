import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
// import ctpClient, { createPasswordClient } from './client';
import {
  createPasswordClient,
  createAnonymousClient,
  createRefreshTokenClient,
} from './client';
import { CustomerDraft, ApiResponse } from '../types/types';

export default class API {
  private apiRoot: ByProjectKeyRequestBuilder;

  private login: boolean;

  constructor() {
    const keyToken = localStorage.getItem('key-token');
    if (keyToken) {
      const { refreshToken } = JSON.parse(keyToken);
      console.log(keyToken);
      this.apiRoot = createApiBuilderFromCtpClient(
        createRefreshTokenClient(refreshToken),
      ).withProjectKey({
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
      });
    } else {
      this.apiRoot = createApiBuilderFromCtpClient(
        createAnonymousClient(),
      ).withProjectKey({
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
      });
    }
    this.login = false;
  }

  public getProject() {
    return this.apiRoot.get().execute();
  }

  public getCustomers() {
    return this.apiRoot.customers().get().execute();
  }

  public getCustomerWithId(id: string) {
    return this.apiRoot.customers().withId({ ID: id }).get().execute();
  }

  public getProducts() {
    return this.apiRoot.products().get().execute();
  }

  public async postCustomerLogin(
    email: string,
    password: string,
    isLogined: boolean,
  ) {
    this.login = isLogined;
    if (!this.login) {
      this.apiRoot = createApiBuilderFromCtpClient(
        createPasswordClient(email, password),
      ).withProjectKey({
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
      });
    }
    try {
      const response = await this.apiRoot
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
      return { result: true, obj: response };
    } catch (error) {
      return { result: false, obj: error };
    }
  }

  public createCustomer(customerDraft: CustomerDraft): Promise<ApiResponse> {
    return this.apiRoot.customers().post({ body: customerDraft }).execute();
  }
}
