import CartPageView from '../../views/Cart/CartView';
import CartPageModel from '../../models/Cart/CartModel';

export default class CartPageController {
  private cartPageView: CartPageView;

  private cartPageModel: CartPageModel;

  constructor(cartPageView: CartPageView, cartPageModel: CartPageModel) {
    this.cartPageView = cartPageView;
    this.cartPageModel = cartPageModel;
  }
}
