import tags from '../../../tags/tags';

export default class ProductCard {
  public card: HTMLElement;

  public link: string;

  public sizesList: HTMLElement;

  public chosenSize: number = 2;

  public cardAddBtn: HTMLElement;

  public activeVariant: number = 0;

  constructor(
    public name: string,
    public desc: string,
    public image: string,
    public id: string,
    public price: string,
    public discount: string,
    public sizes: string[],
    public variantsInCart: { [key: string]: string }[],
    bindClickCallback: (
      isAdd: boolean,
      parentId: string,
      variantId: number,
    ) => void,
  ) {
    this.card = tags.div(['product-card'], '', { id: `${id}` }).getElement();
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
    this.cardAddBtn = tags.button(
      ['product-card__inner__add-button'],
      'Add to cart',
      {
        'data-id': `${id}`,
      },
    );
    this.cardAddBtn.addEventListener('click', () => {
      bindClickCallback(
        this.cardAddBtn.textContent === 'Add to cart',
        this.id,
        this.chosenSize,
      );
      this.cardAddBtnloader();
    });
    this.sizesList = tags.div(['product-card__inner__sizes-list']).getElement();
    this.initializeSizeItems();
    if (discount !== '0.00') {
      cardPrice.classList.add('product-card__inner__price--discounted');
      cardDiscount.classList.add('product-card__inner__discount--discounted');
    }
    cardPriceBlock.appendChildren([cardDiscount, cardPrice]);
    cardFooter.append(this.sizesList, this.cardAddBtn);
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
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    link.append(element);
    return link;
  }

  private initializeSizeItems() {
    if (this.sizes.length !== 0) {
      this.sizes.forEach((size, index) => {
        const sizeItem = tags.span(['product-card__inner__size-item'], size);
        const variantId = `${index + 2}`;
        const isInCart = this.variantsInCart.some(
          (variant) =>
            variant.productId === this.id && variant.variantId === variantId,
        );
        if (isInCart) {
          sizeItem.classList.add('product-card__inner__size-item--incart');
          this.chosenSize = index + 2;
          this.activeVariant = index;
          this.cardAddBtn.textContent = 'Remove from cart';
        }

        sizeItem.addEventListener('click', () => {
          const active = this.sizesList.querySelector(
            '.product-card__inner__size-item--active',
          );
          const currentIsInCart = this.variantsInCart.some(
            (variant) =>
              variant.productId === this.id && variant.variantId === variantId,
          );
          if (active) {
            active.classList.remove('product-card__inner__size-item--active');
          }

          if (sizeItem !== active && !currentIsInCart) {
            sizeItem.classList.add('product-card__inner__size-item--active');
            this.cardAddBtn.textContent = 'Add to cart';
          }
          if (currentIsInCart) {
            this.cardAddBtn.textContent = 'Remove from cart';
          }

          this.chosenSize = index + 2;
        });
        this.sizesList.append(sizeItem);
      });
      this.sizesList.children[this.activeVariant].classList.add(
        'product-card__inner__size-item--active',
      );
    }
  }

  public updateSizeItemClasses() {
    const sizeItems = this.sizesList.querySelectorAll(
      '.product-card__inner__size-item',
    );
    sizeItems.forEach((sizeItem, index) => {
      sizeItem.classList.remove(
        'product-card__inner__size-item--active',
        'product-card__inner__size-item--incart',
      );
      const variantId = `${index + 2}`;
      const isInCart = this.variantsInCart.some(
        (variant) =>
          variant.productId === this.id && variant.variantId === variantId,
      );
      if (this.chosenSize === index + 2) {
        sizeItem.classList.add('product-card__inner__size-item--active');
      }
      if (isInCart) {
        sizeItem.classList.add('product-card__inner__size-item--incart');
        this.chosenSize = index + 2;
        this.activeVariant = index;
        this.cardAddBtn.textContent = 'Remove from cart';
      }
      if (
        isInCart &&
        sizeItem.classList.contains('product-card__inner__size-item--active')
      ) {
        this.cardAddBtn.textContent = 'Remove from cart';
      }
      if (
        !isInCart &&
        sizeItem.classList.contains('product-card__inner__size-item--active')
      ) {
        this.cardAddBtn.textContent = 'Add to cart';
      }
    });
  }

  public cardAddBtnloader() {
    this.cardAddBtn.innerHTML =
      '<span class="product-card__inner__add-button--loader"></span>';
  }
}
