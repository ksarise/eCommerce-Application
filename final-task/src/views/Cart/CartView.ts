import BaseComponentGenerator from '../../tags/base-component';
import MyCartContainer from './components/MyCartContainer';
import TotalCostContainer from './components/TotalCostContainer';
import tags from '../../tags/tags';

export default class CartView {
  public container: BaseComponentGenerator;

  public myCartContainer: MyCartContainer;

  public totalCostContainer: TotalCostContainer;

  public buttonСontinue: HTMLButtonElement;

  constructor() {
    this.container = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['cart'],
    });
    this.myCartContainer = new MyCartContainer();
    this.totalCostContainer = new TotalCostContainer();
    this.buttonСontinue = tags.button(['cart__button_continue'], 'Continue');
  }

  public create() {
    this.createCartPage();
  }

  private createCartPage() {
    this.myCartContainer.create();
    this.totalCostContainer.create();
    this.container.getElement().append(this.myCartContainer.getContent());
    this.container.getElement().append(this.totalCostContainer.getContent());
    this.container.getElement().append(this.buttonСontinue);
  }

  public getContent(): HTMLElement {
    return this.container.getElement();
  }
}
