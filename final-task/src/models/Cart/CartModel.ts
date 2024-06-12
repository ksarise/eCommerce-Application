import { Cart } from '@commercetools/platform-sdk';
import API from '../../services/ApiRoot';

export default class CartPageModel {
  private apiService: API;

  public cart: Cart | undefined;

  constructor(apiService: API) {
    this.apiService = apiService;
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.getCartById(cartId);
    }
  }

  public requestGetProductsFromCart(
    _renderProducts: (products: string) => void,
  ) {
    if (this.cart) {
      this.getCartById(this.cart.id);
    } else {
      _renderProducts('Cart is empty');
    }
  }

  public async getCartById(cartId: string) {
    this.cart = (await this.apiService.getCartById(cartId)).body;
    return this.cart;
  }
}
