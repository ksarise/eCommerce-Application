import API from '../services/ApiRoot';
import RegistrationPageModel from './Registration/RegistrationModel';
import ProductPageModel from './Product/productModel';
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

  public productPageModel: ProductPageModel;

  public isLogined: boolean = false;

  constructor() {
    this.apiService = new API();
    this.registrationModel = new RegistrationPageModel();
    this.mainModel = new MainModel();
    this.productPageModel = new ProductPageModel(this.apiService);
    if (localStorage.getItem('userCreds')) {
      this.isLogined = true;
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
      localStorage.setItem('userCreds', JSON.stringify(true));
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

  public async changePassword(
    version: number,
    current: string,
    newPassword: string,
  ) {
    const result = await this.apiService.changePassword(
      version,
      current,
      newPassword,
    );
    return result;
  }

  public async changePasswordLogin(email: string, password: string) {
    await this.apiService.changePasswordLogin(email, password);
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

  public async requestGetProducts(
    filters?: string[],
    sorts?: string,
    texts?: string,
  ) {
    let response;
    if (filters) {
      response = await this.apiService.getProducts({
        filter: filters,
        sort: sorts,
        text: texts,
      });
    } else {
      response = await this.apiService.getProducts({});
    }
    return response.body;
  }

  public async requestGetCategories() {
    const { body } = await this.apiService.getCategories();
    return body;
  }

  public logout() {
    this.isLogined = false;
    localStorage.removeItem('key-token');
    localStorage.removeItem('userCreds');
    this.apiService.changeTypeClient('anonymous');
    window.location.reload();
  }

  public getProductById(id: string) {
    const response = this.apiService.getProductById(id);
    return response;
  }
}
