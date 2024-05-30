import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import {
  createPasswordClient,
  createAnonymousClient,
  createRefreshTokenClient,
} from './client';
import { CustomerDraft, ApiResponse } from '../global/interfaces/registration';

export default class API {
  private apiRoot: ByProjectKeyRequestBuilder;

  // private login: boolean;

  constructor() {
    const keyToken = localStorage.getItem('key-token');
    if (keyToken) {
      const { refreshToken } = JSON.parse(keyToken);
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
    // this.login = false;
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

  public getMyCustomerDraft() {
    return this.apiRoot.me().get().execute();
  }

  public async postCustomerLogin(email: string, password: string) {
    try {
      await this.changeTypeClient('password', {
        email,
        password,
      });
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

  public changeTypeClient(
    typeClient: string,
    settings?: { refreshToken?: string; email?: string; password?: string },
  ) {
    switch (typeClient) {
      case 'anonymous':
        this.apiRoot = createApiBuilderFromCtpClient(
          createAnonymousClient(),
        ).withProjectKey({
          projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
        });
        break;
      case 'password':
        if (settings && settings.email && settings.password) {
          this.apiRoot = createApiBuilderFromCtpClient(
            createPasswordClient(settings?.email, settings?.password),
          ).withProjectKey({
            projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
          });
        }
        break;
      case 'refreshToken':
        if (settings && settings.refreshToken) {
          this.apiRoot = createApiBuilderFromCtpClient(
            createRefreshTokenClient(settings?.refreshToken),
          ).withProjectKey({
            projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
          });
        }
        break;
      default:
        break;
    }
  }
}
