import API from './ApiRoot';
import { CustomerDraft, ApiResponse } from '../types/types';

export default class CustomerService {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async createCustomer(
    customerDraft: CustomerDraft,
  ): Promise<ApiResponse> {
    try {
      const response = await this.api.createCustomer(customerDraft);
      return response;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }
}
