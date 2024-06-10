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
    this.productPageView.handleClickRemoveFromCartButton =
      this.handleClickRemoveFromCartButton.bind(this);
    this.productPageView.handleClickVariantButton =
      this.handleClickVariantButton.bind(this);
  }

  private handleClickAddToCartButton(productId: string, variantId?: number) {
    this.productPageModel.addToCart(
      productId,
      this.changeButtonCart.bind(this),
      variantId,
    );
  }

  private handleClickRemoveFromCartButton(
    productId: string,
    variantId?: number,
  ) {
    this.productPageModel.removeFromCart(
      productId,
      this.changeButtonCart.bind(this),
      variantId,
    );
  }

  public async handleClickVariantButton(productId: string, variantId: number) {
    const response = await this.productPageModel.isVariantInCart(
      productId,
      variantId,
    );
    if (response) {
      this.changeButtonCart(true);
    } else {
      this.changeButtonCart(false);
    }
  }

  private changeButtonCart(isAdded: boolean) {
    this.productPageView.changeButtonCart(isAdded);
  }
}
