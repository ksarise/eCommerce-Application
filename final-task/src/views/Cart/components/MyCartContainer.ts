import tags from '../../../tags/tags';

export default class MyCartContainer {
  public myCartContainer: HTMLDivElement;

  constructor() {
    this.myCartContainer = tags
      .div(['cart__my-cart', 'my-cart'])
      .getElement() as HTMLDivElement;
  }

  public create() {
    this.myCartContainer.innerHTML = `My cart`;
  }

  public getContent(): HTMLElement {
    return this.myCartContainer;
  }

  public renderProducts(products: string) {
    this.myCartContainer.innerHTML = products;
  }
}
