import API from '../services/ApiRoot';
import RegistrationPageModel from './Registration/RegistrationModel';
import { ApiResponse, RegistrationFormData } from '../types/types';
import createCustomerDraft from '../services/CreateCustomerDraft';

export default class AppModel {
  private apiService: API;

  public registrationModel: RegistrationPageModel;

  constructor() {
    this.apiService = new API();
    this.registrationModel = new RegistrationPageModel();
  }

  public async requestGetCustomers() {
    const { body } = await this.apiService.getCustomers();
    return body;
  }

  public async postLoginCustomer(email: string, password: string) {
    const result = await this.apiService.postCustomerLogin(email, password);
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
}
