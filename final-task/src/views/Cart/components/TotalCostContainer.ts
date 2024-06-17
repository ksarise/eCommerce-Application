// import BaseComponentGenerator from '../../../tags/base-component';
import tags from '../../../tags/tags';

export default class TotalCostContainer {
  [key: string]:
    | HTMLDivElement
    | HTMLSpanElement
    | (() => void)
    | ((nameContainer: string) => void)
    | ((totalCost: number) => void)
    | undefined;

  public costContainer: HTMLDivElement;

  public handleClickPromoCode: (() => void) | undefined;

  private subtotalContainer: HTMLDivElement;

  private subtotalPrice: HTMLSpanElement;

  private discountContainer: HTMLDivElement;

  private discountPrice: HTMLSpanElement;

  private promocodeContainer: HTMLDivElement;

  private totalContainer: HTMLDivElement;

  private totalPrice: HTMLSpanElement;

  constructor() {
    this.costContainer = tags
      .div(['cart__cost'])
      .getElement() as HTMLDivElement;
    this.subtotalContainer = tags
      .div(['cart__cost_subtotal'])
      .getElement() as HTMLDivElement;
    this.subtotalPrice = tags.span(['cart__cost_subtotal-price']);
    this.discountContainer = tags
      .div(['cart__cost_discount'])
      .getElement() as HTMLDivElement;
    this.discountPrice = tags.span(['cart__cost_discount-price']);
    this.promocodeContainer = tags
      .div(['cart__cost_promocode'])
      .getElement() as HTMLDivElement;
    this.totalContainer = tags
      .div(['cart__cost_total'])
      .getElement() as HTMLDivElement;
    this.totalPrice = tags.span(['cart__cost_total-price']);
  }

  public create(): void {
    this.createPriceContainer('subtotal');
    this.createPriceContainer('discount');
    this.createPriceContainer('total');
    this.createPromocodeContainer();
    this.costContainer.append(this.subtotalContainer);
    this.costContainer.append(this.discountContainer);
    this.costContainer.append(this.promocodeContainer);
    this.costContainer.append(this.totalContainer);
  }

  private createPriceContainer(nameContainer: string) {
    const rightContainer = this[`${nameContainer}Container`] as HTMLDivElement;
    const title = tags.span(
      [`cart__cost_${nameContainer}-title`],
      `${nameContainer[0].toUpperCase()}${nameContainer.slice(1)} : `,
    );
    const rightPriceTag = this[`${nameContainer}Price`] as HTMLSpanElement;
    rightPriceTag.innerHTML = '0';
    rightContainer.append(title);
    rightContainer.append(rightPriceTag);
  }

  private createPromocodeContainer() {
    const inputPromocodeTag = tags.input(['cart__cost_promocode-input'], {
      placeholder: 'Add Promo Code',
      id: 'promoCode',
    });
    const promocodeButton = tags.button(
      ['cart__cost_promocode-button'],
      'Apply',
      {},
      'click',
      this!.handleClickPromoCode,
    );
    this.promocodeContainer.append(inputPromocodeTag);
    this.promocodeContainer.append(promocodeButton);
  }

  public renderTotalCost(totalCost: number, discount: number = 0) {
    this.subtotalPrice.innerHTML = `$${totalCost}`;
    this.totalPrice.innerHTML = `$${totalCost}`;
    this.discountPrice.innerHTML = `$${discount}`;
  }

  public getContent(): HTMLElement {
    return this.costContainer;
  }

  // public changeTotalCost(totalCost: number) {
  //   this.subtotalPrice.innerHTML = `$${totalCost}`;
  //   this.totalPrice.innerHTML = `$${totalCost}`;
  // }
}
