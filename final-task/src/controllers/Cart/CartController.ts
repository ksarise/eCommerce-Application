import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import CartPageView from '../../views/Cart/CartView';
import CartPageModel from '../../models/Cart/CartModel';
import routerController from '../../services/router';
import showToast from '../../services/ToastMessages';

export default class CartPageController {
  private cartPageView: CartPageView;

  private cartPageModel: CartPageModel;

  private routerControllerInstance;

  constructor(
    cartPageView: CartPageView,
    cartPageModel: CartPageModel,
    routerControllerMain: typeof routerController,
  ) {
    this.cartPageView = cartPageView;
    this.cartPageModel = cartPageModel;
    this.routerControllerInstance = routerControllerMain;
  }

  public requestGetProductsFromCart() {
    this.cartPageModel.requestGetProductsFromCart(
      this.cartPageView.render.bind(this.cartPageView),
    );
  }

  public initializeListeners() {
    this.cartPageView.handleClickGoToCatalog =
      this.handleClickGoToCatalog.bind(this);
    this.cartPageView.myCartContainer.handleClickQuantity =
      this.handleClickQuantity.bind(this);
    this.cartPageView.myCartContainer.handleClickRemove =
      this.handleClickRemove.bind(this);
    this.cartPageView.myCartContainer.handleClickClearCart =
      this.handleClickClearCart.bind(this);
    this.cartPageView.myCartContainer.handleClickProduct =
      this.handleClickProduct.bind(this);
    this.cartPageView.totalCostContainer.handleClickPromoCode =
      this.handleClickPromoCode.bind(this);
  }

  public handleClickGoToCatalog() {
    this.routerControllerInstance.goToPage('/');
  }

  private async handleClickQuantity(productId: string, delta: number) {
    console.log('here', productId, delta);
    try {
      await this.cartPageModel.updateProductQuantity(
        productId,
        delta,
        this.cartPageView.changeQuantityTotalCost.bind(this.cartPageView),
      );
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickRemove(productId: string) {
    try {
      await this.cartPageModel.removeFromCart(
        productId,
        this.cartPageView.changeQuantityTotalCost.bind(this.cartPageView),
      );
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickClearCart() {
    try {
      await this.cartPageModel.clearCart(
        this.cartPageView.render.bind(this.cartPageView),
      );
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickProduct(productId: string) {
    this.routerControllerInstance.goToPage(`/product/${productId}`);
  }

  private async handleClickPromoCode() {
    try {
      const code = (document.getElementById('promoCode') as HTMLInputElement)
        .value;
      const result: Cart = (
        (await this.cartPageModel.createDiscountById(
          code,
        )) as ClientResponse<Cart>
      ).body;
      const discount =
        result.discountOnTotalPrice?.discountedAmount.centAmount || 0;
      const price = result.totalPrice.centAmount;
      await result.lineItems.forEach((item) => {
        this.cartPageView.myCartContainer.changeQuantity(
          item.id,
          item.quantity,
          result,
          item.totalPrice.centAmount / 100,
        );
      });
      await this.cartPageView.totalCostContainer.renderTotalCost(
        price / 100,
        discount / 100,
      );
      showToast({ text: 'Promo code Active', type: 'positive' });
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }
}
