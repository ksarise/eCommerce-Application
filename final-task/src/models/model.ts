import API from '../services/ApiRoot';

export default class AppModel {
  private apiService: API;

  public isLogined: boolean = false;

  constructor() {
    this.apiService = new API();
    if (localStorage.getItem('userCreds')) {
      this.isLogined = true;
    } else {
      this.isLogined = false;
    }
    console.log(this.isLogined);
    console.log(this.requestGetProducts());
  }

  public async requestGetCustomers() {
    const { body } = await this.apiService.getCustomers();
    return body;
  }

  public async postLoginCustomer(email: string, password: string) {
    const result = await this.apiService.postCustomerLogin(
      email,
      password,
      this.isLogined,
    );
    if (result.result) {
      this.isLogined = true;
      localStorage.setItem('userCreds', JSON.stringify({ email, password }));
    }
    return result;
  }

  public async requestGetProducts() {
    const { body } = await this.apiService.getProducts();
    return body;
  }
}
