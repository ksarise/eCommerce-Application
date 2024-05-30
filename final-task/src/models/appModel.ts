import API from '../services/ApiRoot';
import RegistrationPageModel from './Registration/RegistrationModel';
import {
  ApiResponse,
  RegistrationFormData,
} from '../global/interfaces/registration';
import createCustomerDraft from '../services/CreateCustomerDraft';
import ProfileModel from './profile/profileModel';

export default class AppModel {
  private apiService: API;

  public registrationModel: RegistrationPageModel;

  public profileModel: ProfileModel;

  public isLogined: boolean = false;

  constructor() {
    this.apiService = new API();
    this.registrationModel = new RegistrationPageModel();
    this.profileModel = new ProfileModel();
    if (localStorage.getItem('userCreds')) {
      this.isLogined = true;
      this.apiService.postCustomerLogin(
        JSON.parse(localStorage.getItem('userCreds') as string).email,
        JSON.parse(localStorage.getItem('userCreds') as string).password,
      );
    } else {
      this.isLogined = false;
    }
  }

  public async requestGetCustomers() {
    const { body } = await this.apiService.getCustomers();
    return body;
  }

  public async postLoginCustomer(email: string, password: string) {
    const result = await this.apiService.postCustomerLogin(email, password);
    if (result.result) {
      this.isLogined = true;
      localStorage.setItem('userCreds', JSON.stringify({ email, password }));
    }
    return result;
  }

  public async getCustomerProfile() {
    const result = await this.apiService.getMyCustomerDraft();
    return result;
  }

  public async createCustomer(
    formData: RegistrationFormData,
  ): Promise<ApiResponse> {
    const customerDraft = createCustomerDraft(formData);
    try {
      const response = await this.apiService.createCustomer(customerDraft);
      return response;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  public getProducts() {
    return this.apiService.getProducts();
  }

  public logout() {
    this.isLogined = false;
    localStorage.removeItem('key-token');
    this.apiService.changeTypeClient('anonymous');
  }
}
