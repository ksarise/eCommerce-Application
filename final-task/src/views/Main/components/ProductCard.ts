import tags from '../../../tags/tags';

export default class ProductCard {
  public card: HTMLElement;

  public link: string;

  public sizesList: HTMLElement;

  constructor(
    public name: string,
    public desc: string,
    public image: string,
    public id: string,
    public price: string,
    public discount: string,
    public sizes: string[],
    public variantsInCart: { [key: string]: string }[],
  ) {
    this.card = tags.div(['product-card'], '').getElement();
    const cardInner = tags.div(['product-card__inner'], '').getElement();

    this.link = `${id}`;
    const cardImageContainer = tags
      .div(['product-card__inner__image-container'], '')
      .getElement();

    const cardImage = tags.img(['product-card__inner__image'], {
      src: `${image}`,
    });
    cardImageContainer.append(this.makeLink('image', cardImage));
    const cardContent = tags
      .div(['product-card__inner__content'], '')
      .getElement();

    const cardName = tags.h3(['product-card__inner__name'], `${name}`);
    const cardDesc = tags.p(['product-card__inner__description'], `${desc}`);
    const cardPriceBlock = tags.div(['product-card__inner__prices'], '');

    const cardPrice = tags.p(['product-card__inner__price'], `$${price}`);
    const cardDiscount = tags.p(
      ['product-card__inner__discount'],
      `$${discount}`,
    );
    const cardFooter = tags
      .div(['product-card__inner__footer'], '')
      .getElement();
    const cardAddBtn = tags.button(
      ['product-card__inner__add-button'],
      'Add to cart',
      {
        'data-id': `${id}`,
      },
    );
    this.sizesList = tags.div(['product-card__inner__sizes-list']).getElement();
    if (sizes.length !== 0) {
      sizes.forEach((size, index) => {
        const sizeItem = tags.span(['product-card__inner__size-item'], size);
        const variantId = `${index + 1}`;

        const isInCart = this.variantsInCart.some(
          (variant) =>
            variant.productId === this.id && variant.variantId === variantId,
        );

        if (isInCart) {
          sizeItem.classList.add('product-card__inner__size-item--active');
          cardAddBtn.textContent = 'Remove from cart';
        }
        this.sizesList.append(sizeItem);
      });
    }
    if (discount !== '0.00') {
      cardPrice.classList.add('product-card__inner__price--discounted');
      cardDiscount.classList.add('product-card__inner__discount--discounted');
    }
    cardPriceBlock.appendChildren([cardDiscount, cardPrice]);
    cardFooter.append(this.sizesList, cardAddBtn);
    cardContent.append(
      cardPriceBlock.getElement(),
      this.makeLink('name', cardName),
      cardDesc,
      cardFooter,
    );

    cardInner.append(cardImageContainer, cardContent);
    this.card.append(cardInner);
  }

  public renderCard() {
    return this.card as HTMLElement;
  }

  private makeLink(elementName: string, element: HTMLElement) {
    const link = tags.a(
      [`product-card__inner__${elementName}-link`],
      `/product/${this.link}`,
      '',
      {
        id: `${this.id}`,
        'data-id': this.id,
      },
    );
    link.append(element);
    return link;
  }
}
