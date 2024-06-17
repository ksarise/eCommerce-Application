import { LineItem } from '@commercetools/platform-sdk';
import BaseComponentGenerator from '../../tags/base-component';
import MyCartContainer from './components/MyCartContainer';
import TotalCostContainer from './components/TotalCostContainer';
import tags from '../../tags/tags';

export default class CartView {
  public container: BaseComponentGenerator;

  public myCartContainer: MyCartContainer;

  public totalCostContainer: TotalCostContainer;

  public buttonСontinue: HTMLButtonElement;

  public handleClickGoToCatalog: (() => void) | undefined;

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

  public render(products: LineItem[], totalCost: number, discount: number = 0) {
    if (products.length === 0) {
      this.renderEmptyCart();
      return;
    }
    this.myCartContainer.renderProducts(products);
    this.totalCostContainer.renderTotalCost(totalCost, discount);
  }

  private renderEmptyCart() {
    this.container.getElement().innerHTML = '';
    const cartEmptyImageContainer = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['cart__empty'],
    });
    const cartEmptyHeader = tags.h2(
      ['cart__empty_header'],
      'Sorry, but your cart is empty',
    );
    const cartButtonToCatalog = tags.button(
      ['cart__empty_button'],
      'Go to catalog',
    );
    if (this.handleClickGoToCatalog) {
      cartButtonToCatalog.addEventListener('click', () => {
        this.handleClickGoToCatalog!();
      });
    }
    this.container.getElement().append(cartEmptyHeader);
    this.container.getElement().append(cartEmptyImageContainer.getElement());
    this.container.getElement().append(cartButtonToCatalog);
  }

  public changeQuantityTotalCost(
    lineItemId: string,
    quantity: number,
    totalCost: number,
    totalDiscount: number,
    totalCostLineItem?: number,
  ) {
    if (totalCost === 0) {
      this.renderEmptyCart();
      return;
    }
    console.log(totalCostLineItem);
    this.myCartContainer.changeQuantity(
      lineItemId,
      quantity,
      totalCostLineItem,
    );
    this.totalCostContainer.renderTotalCost(totalCost, totalDiscount);
  }
}
