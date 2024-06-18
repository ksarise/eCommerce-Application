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
    _render: (
      products: LineItem[],
      totalCost: number,
      discount: number,
    ) => void,
  ) {
    if (this.cart) {
      await this.getCartById(this.cart.id);
      const discount = this.cart.discountOnTotalPrice
        ? this.cart.discountOnTotalPrice?.discountedAmount.centAmount
        : 0;
      _render(
        this.cart.lineItems,
        this.cart.totalPrice.centAmount / 100,
        discount / 100,
      );
      // _renderProducts(this.cart.lineItems);
      // _renderTotalCost(this.cart.totalPrice.centAmount / 100);
    } else {
      _render([], 0, 0);
      // _renderProducts([]);
    }
  }

  public async getCartById(cartId: string) {
    this.cart = (await this.apiService.getCartById(cartId)).body;
    return this.cart;
  }

  public async updateProductQuantity(
    lineItemId: string,
    quantity: number,
    _changeQuantityTotalCost: (
      lineItemId: string,
      quantity: number,
      totalCost: number,
      totalDiscount: number,
      cart: Cart,
      totalCostLineItem?: number,
    ) => void,
  ) {
    await this.getCartById(this.cart!.id);
    const lineItem = this.cart?.lineItems.find(
      (item) => item.id === lineItemId,
    );
    const nowQuantity = lineItem?.quantity || 0;
    const newQuantity = nowQuantity + quantity;
    try {
      const response = await this.apiService.updateProductQuantity(
        this.cart!.id,
        lineItemId,
        newQuantity,
        this.cart!.version,
      );
      await this.getCartById(this.cart!.id);
      const tmpLineItem = this.cart?.lineItems.find(
        (item) => item.id === lineItemId,
      );
      let rightLineItemPrice;
      if (tmpLineItem) {
        rightLineItemPrice = tmpLineItem!.totalPrice.centAmount / 100;
      }
      const discount = this.cart!.discountOnTotalPrice
        ? this.cart!.discountOnTotalPrice?.discountedAmount.centAmount
        : 0;
      _changeQuantityTotalCost(
        lineItemId,
        newQuantity,
        this.cart!.totalPrice.centAmount / 100,
        discount / 100,
        this.cart!,
        rightLineItemPrice,
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  public async removeFromCart(
    lineItemId: string,
    _changeQuantityTotalCost: (
      lineItemId: string,
      quantity: number,
      totalCost: number,
      totalDiscount: number,
      cart: Cart,
      totalCostLineItem?: number,
    ) => void,
  ) {
    await this.getCartById(this.cart!.id);
    try {
      const response = await this.apiService.removeLineItemFromCart(
        this.cart!.id,
        lineItemId,
        this.cart!.version,
      );
      await this.getCartById(this.cart!.id);
      const tmpLineItem = this.cart?.lineItems.find(
        (item) => item.id === lineItemId,
      );
      let rightLineItemPrice;
      if (tmpLineItem) {
        rightLineItemPrice = tmpLineItem!.totalPrice.centAmount / 100;
      }
      const discount = this.cart?.discountOnTotalPrice
        ? this.cart?.discountOnTotalPrice.discountedAmount.centAmount
        : 0;
      _changeQuantityTotalCost(
        lineItemId,
        0,
        this.cart!.totalPrice.centAmount / 100,
        discount / 100,
        this.cart!,
        rightLineItemPrice,
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  public async clearCart(
    _render: (products: LineItem[], totalCost: number) => void,
  ) {
    await this.createCart();
    await this.requestGetProductsFromCart(_render);
  }

  public async createCart() {
    this.cart = (await this.apiService.createCartRequest()).body;
    localStorage.setItem('cartId', this.cart.id);
  }

  public async createDiscountById(code: string) {
    try {
      await this.getCartById(this.cart!.id);
      const result = await this.apiService.createDiscountById(
        this.cart!.id,
        code,
        this.cart!.version,
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
