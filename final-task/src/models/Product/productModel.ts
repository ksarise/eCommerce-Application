import { Cart } from '@commercetools/platform-sdk';
import API from '../../services/ApiRoot';

export default class ProductPageModel {
  private apiService: API;

  private cart: Cart | undefined;

  constructor(apiService: API) {
    this.apiService = apiService;
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.getCartById(cartId);
    }
  }

  public async addToCart() {
    if (!this.cart) {
      this.createCart();
    }
  }

  public async createCart() {
    this.cart = (await this.apiService.createCartRequest()).body;
    localStorage.setItem('cartId', this.cart.id);
  }

  public async getCartById(cartId: string) {
    this.cart = (await this.apiService.getCartById(cartId)).body;
  }
}
