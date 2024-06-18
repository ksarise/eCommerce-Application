import tags from '../../../tags/tags';

export default class DiscountBanner {
  code: string;

  description: string | undefined;

  name: string | undefined;

  banner: HTMLElement;

  constructor(
    name: string | undefined,
    description: string | undefined,
    code: string,
  ) {
    this.name = name;
    this.description = description;
    this.code = code;
    this.banner = tags.div(['promocode__banner']).getElement();
    this.createBanner();
  }

  private createBanner() {
    const bannerName = tags
      .div(
        ['promocode__banner_name'],
        `${this.name || 'Discount'}: ${this.description || ''}`,
      )
      .getElement();
    const discount = tags
      .div(
        ['promocode__banner_discount'],
        `to get this discount use promo code ${this.code}`,
      )
      .getElement();
    const cross = tags.div(['cross-white']).getElement();
    cross.addEventListener('click', () => {
      this.banner.classList.add('promocode__hidden');
    });
    this.banner.append(bannerName, discount, cross);
  }

  public getBanner() {
    return this.banner;
  }
}
