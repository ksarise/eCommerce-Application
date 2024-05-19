import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { anonymousClient, createPasswordFlow } from './client';
// import { createPasswordFlow } from './client';
// import { ctpClient } from './client';
// import { passwordClient2 } from './client';

export default class API {
  public apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(
      anonymousClient,
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
  }

  public getProject() {
    return this.apiRoot.get().execute();
  }

  public getCustomers() {
    return this.apiRoot.customers().get().execute();
  }

  public getProducts() {
    return this.apiRoot.products().get().execute();
  }

  public getCustomerWithId(id: string) {
    return this.apiRoot.customers().withId({ ID: id }).get().execute();
  }

  public createPasswordFlow() {
    console.log(this.apiRoot);
    this.apiRoot = createApiBuilderFromCtpClient(
      createPasswordFlow(),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
    this.apiRoot
      .customers()
      .get()
      .execute()
      .then((response) => {
        console.log(response.body);
      });
    console.log(this.apiRoot);
  }
}
