import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import ctpClient, { createPasswordClient } from './client';

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
        console.log(response);
        this.login = true;
      })
      .catch((error) => {
        this.login = false;
        console.error(error);
      });
  }
}
