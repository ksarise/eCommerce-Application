import tags from '../../../tags/tags';

export default class ProductCard {
  public card: HTMLElement;

  public link: string;

  constructor(
    public name: string,
    public desc: string,
    public image: string,
    public id: string,
    public price: string,
    public discount: string,
  ) {
    this.card = tags.div(['product-card'], '').getElement();

    this.link = ProductCard.nameToLink(name);
    const cardLink = tags.a(
      ['product-card__link'],
      `/product/${this.link}`,
      '',
      {
        id: `${id}`,
      },
    );

    const cardImage = tags.img(['product-card__image'], {
      src: `${image}`,
    });
    const cardName = tags.h3(['product-card__name'], `${name}`);
    const cardDesc = tags.p(['product-card__desc'], `${desc}`);
    const cardPrice = tags.p(['product-card__price'], `$${price}`);
    const cardDiscount = tags.p(['product-card__discount'], `$${discount}`);
    if (discount !== '0.00') {
      cardPrice.classList.add('discounted');
      cardDiscount.classList.add('discounted');
    }
    cardLink.append(cardImage, cardName, cardDesc, cardDiscount, cardPrice);
    this.card.append(cardLink);
  }

  // Set link href
  static nameToLink(name: string) {
    return name.replace(/[\s.]+/g, '-').toLowerCase();
  }

  public renderCard() {
    return this.card as HTMLElement;
  }
}
