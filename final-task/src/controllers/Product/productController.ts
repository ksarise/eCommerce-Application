import ProductPageView from '../../views/ProductPage/ProductPageView';
import ProductPageModel from '../../models/Product/productModel';

export default class ProductPageController {
  private productPageView: ProductPageView;

  private productPageModel: ProductPageModel;

  constructor(
    prodcutPageView: ProductPageView,
    productPageModel: ProductPageModel,
  ) {
    this.productPageView = prodcutPageView;
    this.productPageModel = productPageModel;
  }

  public initializeListeners() {
    this.productPageView.handleClickAddToCartButton =
      this.handleClickAddToCartButton.bind(this);
  }

  private handleClickAddToCartButton() {
    this.productPageModel.addToCart();
  }
}
