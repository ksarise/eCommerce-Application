import { Cart, LineItemDraft } from '@commercetools/platform-sdk';
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

  public async addToCart(productId: string) {
    if (!this.cart) {
      await this.createCart();
    }
    const currentCart = await this.getCartById(this.cart!.id);
    const lineItemDraft: LineItemDraft = {
      productId,
      // variantId: 1, // ID варианта товара (если есть)
      quantity: 1,
    };
    await this.apiService.addLineItemToCart(
      this.cart!.id,
      lineItemDraft,
      currentCart.version,
    );
  }

  public async createCart() {
    this.cart = (await this.apiService.createCartRequest()).body;
    localStorage.setItem('cartId', this.cart.id);
  }

  public async getCartById(cartId: string) {
    this.cart = (await this.apiService.getCartById(cartId)).body;
    return this.cart;
  }
}
