import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import ctpClient, { createPasswordClient } from './client';
import { CustomerDraft, ApiResponse } from '../types/types';

export default class API {
  private apiRoot: ByProjectKeyRequestBuilder;

  private login: boolean;

  constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
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

  public postCustomerLogin(email: string, password: string) {
    if (!this.login) {
      this.apiRoot = createApiBuilderFromCtpClient(
        createPasswordClient(email, password),
      ).withProjectKey({
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
      });
    }
    return this.apiRoot
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute()
      .then((response) => {
        if (!localStorage.getItem('true-key')) {
          localStorage.setItem('true-key', JSON.stringify(true));
        }
        this.login = true;
        return { result: true, obj: response };
      })
      .catch((error) => {
        if (!localStorage.getItem('true-key')) {
          localStorage.removeItem('key-token');
        }
        return { result: false, obj: error };
      });
  }

  public createCustomer(customerDraft: CustomerDraft): Promise<ApiResponse> {
    return this.apiRoot.customers().post({ body: customerDraft }).execute();
  }
}
