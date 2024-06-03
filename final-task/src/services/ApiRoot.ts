import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
  Product,
  ClientResponse,
} from '@commercetools/platform-sdk';
import {
  createPasswordClient,
  createAnonymousClient,
  createRefreshTokenClient,
} from './client';
import { CustomerDraft, ApiResponse } from '../global/interfaces/registration';

export default class API {
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    const keyToken = localStorage.getItem('key-token');
    const userCreds = JSON.parse(localStorage.getItem('userCreds') as string);
    if (keyToken) {
      const { refreshToken } = JSON.parse(keyToken);
      this.apiRoot = createApiBuilderFromCtpClient(
        createRefreshTokenClient(refreshToken),
      ).withProjectKey({
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
      });
    } else if (userCreds && !keyToken) {
      this.apiRoot = createApiBuilderFromCtpClient(
        createPasswordClient(userCreds.email, userCreds.password),
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

  public getCategories() {
    return this.apiRoot.categories().get().execute();
  }

  public getMyCustomerDraft() {
    return this.apiRoot.me().get().execute();
  }

  public changePersonalInfo(
    name: string,
    surname: string,
    date: string,
    email: string,
    version: number,
  ) {
    return this.apiRoot
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'setFirstName',
              firstName: name,
            },
            {
              action: 'setLastName',
              lastName: surname,
            },
            {
              action: 'changeEmail',
              email,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: date,
            },
          ],
        },
      })
      .execute();
  }

  public async changePasswordLogin() {
    const { email } = JSON.parse(localStorage.getItem('userCreds') as string);
    const { password } = JSON.parse(
      localStorage.getItem('userCreds') as string,
    );
    await this.changeTypeClient('password', { email, password });
    await this.postCustomerLogin(email, password);
  }

  public changePassword(version: number, current: string, newPassword: string) {
    return this.apiRoot
      .me()
      .password()
      .post({
        body: {
          version,
          currentPassword: current,
          newPassword,
        },
      })
      .execute();
  }

  public addNewAddress(
    streetName: string,
    city: string,
    country: string,
    postalCode: string,
    version: number,
  ) {
    return this.apiRoot
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addAddress',
              address: {
                streetName,
                city,
                country,
                postalCode,
              },
            },
          ],
        },
      })
      .execute();
  }

  public editAddress(
    streetName: string,
    city: string,
    country: string,
    postalCode: string,
    version: number,
    index: string,
  ) {
    return this.apiRoot
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeAddress',
              addressId: `${index}`,
              address: {
                streetName,
                city,
                country,
                postalCode,
              },
            },
          ],
        },
      })
      .execute();
  }

  public removeAddress(index: string, version: number) {
    return this.apiRoot
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeAddress',
              addressId: `${index}`,
            },
          ],
        },
      })
      .execute();
  }

  public setDefaultAddress(index: string, version: number, shipping: boolean) {
    const address = shipping
      ? 'setDefaultShippingAddress'
      : 'setDefaultBillingAddress';
    return this.apiRoot
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: address,
              addressId: `${index}`,
            },
          ],
        },
      })
      .execute();
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

  public getProductById(id: string): Promise<ClientResponse<Product>> {
    const response = this.apiRoot.products().withId({ ID: id }).get().execute();
    return response;
  }
}
