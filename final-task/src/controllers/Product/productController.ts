import ProductPageView from '../../views/ProductPage/ProductPageView';
import ProductPageModel from '../../models/Product/productModel';
import showToast from '../../services/ToastMessages';

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

  private async handleClickAddToCartButton(
    productId: string,
    variantId?: number,
  ) {
    try {
      await this.productPageModel.addToCart(
        productId,
        this.changeButtonCart.bind(this),
        variantId,
      );
    } catch (error) {
      showToast({ text: (error as Error).message, type: 'negative' });
    }
  }

  private async handleClickRemoveFromCartButton(
    productId: string,
    variantId?: number,
  ) {
    try {
      await this.productPageModel.removeFromCart(
        productId,
        this.changeButtonCart.bind(this),
        variantId,
      );
    } catch (errors) {
      showToast({ text: (errors as Error).message, type: 'negative' });
    }
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
