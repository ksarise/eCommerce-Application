import { Cart, LineItem } from '@commercetools/platform-sdk';
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

  public async requestGetProductsFromCart(
    // _renderProducts: (products: LineItem[]) => void,
    // _renderTotalCost: (totalCost: number) => void,
    _render: (products: LineItem[], totalCost: number) => void,
  ) {
    if (this.cart) {
      await this.getCartById(this.cart.id);
      _render(this.cart.lineItems, this.cart.totalPrice.centAmount / 100);
      // _renderProducts(this.cart.lineItems);
      // _renderTotalCost(this.cart.totalPrice.centAmount / 100);
    } else {
      _render([], 0);
      // _renderProducts([]);
    }
  }

  public async getCartById(cartId: string) {
    this.cart = (await this.apiService.getCartById(cartId)).body;
    return this.cart;
  }
}
