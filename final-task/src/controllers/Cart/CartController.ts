import CartPageView from '../../views/Cart/CartView';
import CartPageModel from '../../models/Cart/CartModel';
import routerController from '../../services/router';

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
  }

  public handleClickGoToCatalog() {
    this.routerControllerInstance.goToPage('/');
  }
}
