import BaseComponentGenerator from '../../tags/base-component';
import MyCartContainer from './components/MyCartContainer';
// import tags from '../../tags/tags';

export default class CartView {
  public container: BaseComponentGenerator;

  public myCartContainer: MyCartContainer;

  constructor() {
    this.container = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['cart'],
    });
    this.myCartContainer = new MyCartContainer();
  }

  public create() {
    this.createCartPage();
  }

  private createCartPage() {
    this.myCartContainer.create();
    this.container.getElement().append(this.myCartContainer.getContent());
  }

  public getContent(): HTMLElement {
    return this.container.getElement();
  }
}
