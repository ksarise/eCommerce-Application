// import { Cart, LineItemDraft } from '@commercetools/platform-sdk';
import { LineItemDraft } from '@commercetools/platform-sdk';
import API from '../../services/ApiRoot';
import showToast from '../../services/ToastMessages';
import CartPageModel from '../Cart/CartModel';

export default class ProductPageModel {
  private apiService: API;

  // private cart: Cart | undefined;

  private cartPageModel: CartPageModel;

  constructor(apiService: API, cartModel: CartPageModel) {
    this.apiService = apiService;
    this.cartPageModel = cartModel;
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.cartPageModel.getCartById(cartId);
    }
  }

  public async addToCart(
    productId: string,
    _changeButtonCart: (isAdded: boolean) => void,
    variantId?: number,
  ) {
    if (!this.cartPageModel.cart) {
      await this.createCart();
    }
    const currentCart = await this.getCartById(this.cartPageModel.cart!.id);
    const lineItemDraft: LineItemDraft = {
      productId,
      variantId,
      quantity: 1,
    };
    const response = await this.apiService.addLineItemToCart(
      this.cartPageModel.cart!.id,
      lineItemDraft,
      currentCart.version,
    );
    this.cartPageModel.updateHeaderCartQuantity?.(
      response.body.totalLineItemQuantity || 0,
    );
    if (response.statusCode === 200 || response.statusCode === 201) {
      _changeButtonCart(true);
    } else {
      _changeButtonCart(false);
    }
  }

  public async removeFromCart(
    productId: string,
    _changeButtonCart: (isAdded: boolean) => void,
    variantId?: number,
  ) {
    if (this.cartPageModel.cart) {
      const currentCart = await this.getCartById(this.cartPageModel.cart!.id);
      const lineItemProducts = this.cartPageModel.cart.lineItems.filter(
        (item) => item.productId === productId,
      );
      const rightVariantId = variantId || 1;
      const lineItem = lineItemProducts.find(
        (item) => item.variant.id === rightVariantId,
      );
      if (!lineItem) {
        showToast({ text: 'This variant not in Card', type: 'negative' });
        return;
      }
      const lineItemId = lineItem.id;
      const response = await this.apiService.removeLineItemFromCart(
        this.cartPageModel.cart.id,
        lineItemId,
        currentCart.version,
      );
      this.cartPageModel.updateHeaderCartQuantity?.(
        response.body.totalLineItemQuantity || 0,
      );
      if (response.statusCode === 200 || response.statusCode === 201) {
        _changeButtonCart(false);
      } else {
        _changeButtonCart(true);
      }
    }
  }

  public async createCart() {
    this.cartPageModel.cart = (await this.apiService.createCartRequest()).body;
    localStorage.setItem('cartId', this.cartPageModel.cart.id);
  }

  public async getCartById(cartId: string) {
    this.cartPageModel.cart = (await this.apiService.getCartById(cartId)).body;
    return this.cartPageModel.cart;
  }

  public async isVariantInCart(productId: string, variantId: number) {
    if (this.cartPageModel.cart) {
      await this.getCartById(this.cartPageModel.cart.id);
      const lineItemProducts = this.cartPageModel.cart.lineItems.filter(
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
