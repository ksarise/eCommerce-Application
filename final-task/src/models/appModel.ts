import API from '../services/ApiRoot';
import RegistrationPageModel from './Registration/RegistrationModel';
import {
  ApiResponse,
  RegistrationFormData,
} from '../global/interfaces/registration';
import createCustomerDraft from '../services/CreateCustomerDraft';
import MainModel from './Main/MainModel';

export default class AppModel {
  private apiService: API;

  public registrationModel: RegistrationPageModel;

  public mainModel: MainModel = new MainModel();

  public isLogined: boolean = false;

  constructor() {
    this.apiService = new API();
    this.registrationModel = new RegistrationPageModel();
    this.mainModel = new MainModel();
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

  public async changePersonalInfo(
    name: string,
    surname: string,
    date: string,
    email: string,
    version: number,
  ) {
    const result = await this.apiService.changePersonalInfo(
      name,
      surname,
      date,
      email,
      version,
    );
    return result;
  }

  public async addOrEditAddress(
    firstName: string,
    lastName: string,
    streetName: string,
    city: string,
    country: string,
    postalCode: string,
    version: number,
    index?: string,
  ) {
    const countryCode = country === 'Canada' ? 'CA' : 'US';
    if (index) {
      const result = await this.apiService.editAddress(
        firstName,
        lastName,
        streetName,
        city,
        countryCode,
        postalCode,
        version,
        index,
      );
      return result;
    }
    const result = await this.apiService.addNewAddress(
      firstName,
      lastName,
      streetName,
      city,
      countryCode,
      postalCode,
      version,
    );
    return result;
  }

  public async removeAddress(version: number, index: string) {
    const result = await this.apiService.removeAddress(index, version);
    return result;
  }

  public async setDefaultAddress(
    version: number,
    index: string,
    shipping: boolean,
  ) {
    const result = await this.apiService.setDefaultAddress(
      index,
      version,
      shipping,
    );
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

  public async requestGetProducts() {
    const { body } = await this.apiService.getProducts();
    return body;
  }

  public logout() {
    this.isLogined = false;
    localStorage.removeItem('key-token');
    this.apiService.changeTypeClient('anonymous');
    window.location.reload();
  }

  public getProductById(id: string) {
    const response = this.apiService.getProductById(id);
    return response;
  }
}
