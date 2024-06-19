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

  public requestGetProductsFromCart(
    quantityUpdateCallback: (quantity: number) => void,
  ) {
    this.cartPageModel.requestGetProductsFromCart(
      this.cartPageView.render.bind(this.cartPageView),
      quantityUpdateCallback,
    );
  }

  public initializeListeners(
    quantityUpdateCallback: (quantity: number) => void,
  ) {
    this.cartPageView.handleClickGoToCatalog =
      this.handleClickGoToCatalog.bind(this);
    this.cartPageView.myCartContainer.handleClickQuantity =
      this.handleClickQuantity.bind(this, quantityUpdateCallback);
    this.cartPageView.myCartContainer.handleClickRemove =
      this.handleClickRemove.bind(this, quantityUpdateCallback);
    this.cartPageView.myCartContainer.handleClickClearCart =
      this.handleClickClearCart.bind(this, quantityUpdateCallback);
    this.cartPageView.myCartContainer.handleClickProduct =
      this.handleClickProduct.bind(this);
    this.cartPageView.totalCostContainer.handleClickPromoCode =
      this.handleClickPromoCode.bind(this, quantityUpdateCallback);
  }

  public handleClickGoToCatalog() {
    this.routerControllerInstance.goToPage('/catalog');
  }

  private async handleClickQuantity(
    quantityUpdateCallback: (quantity: number) => void,
    productId: string,
    delta: number,
  ) {
    console.log('here', productId, delta);
    try {
      await this.cartPageModel.updateProductQuantity(
        productId,
        delta,
        this.cartPageView.changeQuantityTotalCost.bind(this.cartPageView),
        quantityUpdateCallback,
      );
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickRemove(
    quantityUpdateCallback: (quantity: number) => void,
    productId: string,
  ) {
    try {
      await this.cartPageModel.removeFromCart(
        productId,
        this.cartPageView.changeQuantityTotalCost.bind(this.cartPageView),
        quantityUpdateCallback,
      );
      quantityUpdateCallback(
        this.cartPageModel.cart!.totalLineItemQuantity || 0,
      );
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickClearCart(
    quantityUpdateCallback: (quantity: number) => void,
  ) {
    try {
      await this.cartPageModel.clearCart(
        this.cartPageView.render.bind(this.cartPageView),
        quantityUpdateCallback,
      );
      quantityUpdateCallback(0);
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickProduct(productId: string) {
    this.routerControllerInstance.goToPage(`/product/${productId}`);
  }

  private async handleClickPromoCode(
    quantityUpdateCallback: (quantity: number) => void,
  ) {
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
      (document.getElementById('promoCode') as HTMLInputElement).value = '';
      quantityUpdateCallback(result.totalLineItemQuantity || 0);
    } catch (error) {
      showToast({
        text: `There is no promo code ${
          (document.getElementById('promoCode') as HTMLInputElement).value
        }`,
        type: 'negative',
      });
    }
  }
}
