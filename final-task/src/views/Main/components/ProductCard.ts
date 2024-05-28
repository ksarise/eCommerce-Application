import tags from '../../../tags/tags';

export default class ProductCard {
  public card: HTMLElement;

  public link: string;

  constructor(
    public name: string,
    public desc: string,
    public image: string,
    public id: string,
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
    cardLink.append(cardImage, cardName, cardDesc);
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
