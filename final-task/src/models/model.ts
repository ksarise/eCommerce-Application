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

  public async postLoginCustomer(email: string, password: string) {
    const result = await this.apiService.postCustomerLogin(email, password);
    return result;
  }
}
