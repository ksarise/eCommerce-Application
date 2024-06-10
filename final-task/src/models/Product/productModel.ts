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

  public async addToCart(
    productId: string,
    _changeButtonCart: (isAdded: boolean) => void,
    variantId?: number,
  ) {
    if (!this.cart) {
      await this.createCart();
    }
    const currentCart = await this.getCartById(this.cart!.id);
    const lineItemDraft: LineItemDraft = {
      productId,
      variantId,
      quantity: 1,
    };
    const response = await this.apiService.addLineItemToCart(
      this.cart!.id,
      lineItemDraft,
      currentCart.version,
    );
    if (response.statusCode === 200 || response.statusCode === 201) {
      _changeButtonCart(true);
    } else {
      _changeButtonCart(false);
    }
  }

  public async createCart() {
    this.cart = (await this.apiService.createCartRequest()).body;
    localStorage.setItem('cartId', this.cart.id);
  }

  public async getCartById(cartId: string) {
    this.cart = (await this.apiService.getCartById(cartId)).body;
    return this.cart;
  }

  public async isVariantInCart(productId: string, variantId: number) {
    if (this.cart) {
      await this.getCartById(this.cart.id);
      const lineItemProducts = this.cart.lineItems.filter(
        (item) => item.productId === productId,
      );
      if (lineItemProducts.length > 0) {
        return lineItemProducts.some((item) => item.variant.id === variantId);
      }
      return false;
    }
    return false;
  }
}
