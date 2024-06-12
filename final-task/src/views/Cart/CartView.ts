import BaseComponentGenerator from '../../tags/base-component';
// import tags from '../../tags/tags';

export default class CartView {
  public container: BaseComponentGenerator;

  constructor() {
    this.container = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['cart'],
    });
  }

  public create() {
    this.createCartPage();
  }

  private createCartPage() {
    this.container.getElement().innerHTML = `Cart`;
  }

  public getContent(): HTMLElement {
    return this.container.getElement();
  }
}
