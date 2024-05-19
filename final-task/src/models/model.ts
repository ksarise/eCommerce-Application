import API from '../services/ApiRoot';

export default class AppModel {
  private apiService: API;

  constructor() {
    this.apiService = new API();
  }

  public async requestGetCustomers() {
    const { body } = await this.apiService.getCustomers();
    return body;
  }

  public async requestGetProducts() {
    const { body } = await this.apiService.getProducts();
    return body;
  }

  public async requestLogin() {
    const { body } = await this.apiService.apiRoot
      // .me()
      .login()
      .post({
        body: {
          email: 'test@test.com',
          password: '12345678',
        },
      })
      .execute();
    // .login()
    // .post({
    //   body: {
    //     email,
    //     password,
    //   },
    // })
    // .execute()
    // .then((response) => console.log(response))
    // .catch((error) => {
    //   console.log(error);
    // });
    return body;
  }

  public createNewApiRoot() {
    this.apiService.createPasswordFlow();
  }
}
