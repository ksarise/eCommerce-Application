import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';

export default class ProductPageView {
  private container: BaseComponentGenerator;

  private imageContainer: HTMLDivElement;

  private descriptionContainer: HTMLDivElement;

  constructor() {
    this.container = tags.div(['product'], '', {});
    this.imageContainer = tags
      .div(['product__image'], 'imageContainer', {})
      .getElement() as HTMLDivElement;
    this.descriptionContainer = tags
      .div(['product__description'], 'descriptionContainer', {})
      .getElement() as HTMLDivElement;
  }

  public getContent(): HTMLElement {
    return this.container.getElement();
  }

  public create() {
    this.createProductPage();
  }

  public createProductPage(): void {
    this.container.appendChildren([
      this.imageContainer,
      this.descriptionContainer,
    ]);
  }
}
