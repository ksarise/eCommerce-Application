import tags from '../../tags/tags';
import homeData from './components/homeData.json';

export default class HomeView {
  private container: HTMLDivElement;

  public buttonToCatalogCallback: ((event?: Event) => void) | undefined;

  constructor() {
    this.container = tags.div(['home']).getElement() as HTMLDivElement;
    // top
    const topSection = tags.section(['home__top', 'section']);
    const descriptionContainer = tags
      .div(['home__top__container'])
      .getElement() as HTMLDivElement;
    const descriptionTitle = tags.h1(
      ['home__top__title'],
      `Celebrate the 40th anniversary of the GNU Project! `,
    );
    const descriptionText = tags.p(
      ['home__top__text'],
      'Save 30% on any board!',
    );
    const descriptionButton = tags.button(
      ['home__top__button', 'home__button', 'home__category__link'],
      'Shop Sale',
      {
        'data-optiontype': 'category',
        'data-optionname': 'GNU',
        'data-id': '796a4ef4-83a6-491b-bd69-4b047da6ad62',
        'data-main': 'Brand',
        href: `brand/gnu`,
      },
    );
    descriptionContainer.append(
      descriptionTitle,
      descriptionText,
      descriptionButton,
    );
    topSection.append(descriptionContainer);

    // terrain
    const terrainSection = tags.section(['home__terrain', 'section']);
    const midTitle = tags.h1(
      ['home__terrain__title'],
      'You can find board for every terrain!',
    );
    terrainSection.append(midTitle);
    const categoriesContainer = tags
      .div(['home__terrain__categories'])
      .getElement() as HTMLDivElement;

    HomeView.renderBlocks('terrain', homeData.terrains, categoriesContainer);
    terrainSection.append(categoriesContainer);

    // brand
    const brandSection = tags.section(['home__brands', 'section']);
    const brandsTitle = tags.h2(['home__brands__title'], 'Our Brands');
    const brandsContainer = tags
      .div(['home__brands__container'])
      .getElement() as HTMLDivElement;
    HomeView.renderBlocks('brand', homeData.brands, brandsContainer);
    brandSection.append(brandsTitle, brandsContainer);
    // mid
    const midSection = tags.section(['home__mid', 'section']);

    // specoffers
    const specialOffersContainer = tags
      .div(['home__mid__special-offers'])
      .getElement() as HTMLDivElement;
    const specialOffersTitle = tags.h2(
      ['home__mid__special-offers__title'],
      'Special Offers',
    );
    const specialOffersList = tags
      .div(['home__mid__special-offers__list'])
      .getElement() as HTMLDivElement;
    specialOffersContainer.append(specialOffersTitle);
    homeData.offerItems.forEach((offer, index) => {
      const offerItem = tags
        .div(['home__mid__special-offers__item'])
        .getElement() as HTMLDivElement;
      offerItem.style.backgroundImage = `url(/images/homepage/offers/offer${index + 1}.jpg)`;
      const offerTitle = tags.h3(
        ['home__mid__special-offers__item__title'],
        offer.title,
      );
      const offerDiscount = tags.h2([
        'home__mid__special-offers__item__discount',
      ]);
      offerDiscount.innerHTML = offer.discount;
      const offerButton = tags.button(
        ['home__mid__special-offers__item__button', 'home__button'],
        offer.button,
      );
      offerButton.addEventListener('click', () => {
        if (this.buttonToCatalogCallback) {
          this.buttonToCatalogCallback();
        }
      });
      offerItem.append(offerDiscount, offerTitle, offerButton);
      specialOffersList.append(offerItem);
      specialOffersContainer.append(specialOffersList);
    });

    // featured products
    const featuredProductsContainer = tags
      .div(['home__mid__featured-products'])
      .getElement() as HTMLDivElement;
    const featuredProductsTitle = tags.h2(
      ['home__mid__featured-products__title'],
      'Featured Products',
    );
    featuredProductsContainer.append(featuredProductsTitle);
    const featuredProductsList = tags
      .div(['home__mid__featured-products__list'])
      .getElement() as HTMLDivElement;
    homeData.products.forEach((product, index) => {
      const productItem = tags
        .div(['home__mid__featured-products__item'])
        .getElement() as HTMLDivElement;
      const productImage = tags.img(
        ['home__mid__featured-products__item__image'],
        {
          src: `/images/homepage/products/product-${index}.jpg`,
        },
      );
      const productTitle = tags.p(
        ['home__mid__featured-products__item__title'],
        product.title,
      );
      const productPrice = tags.span(
        ['home__mid__featured-products__item__price'],
        product.price,
      );
      const productButtonLink = tags.a(
        ['home__mid__featured-products__item__button__link'],
        `/product/${product.id}`,
      );
      const productButton = tags.button(
        ['home__mid__featured-products__item__button'],
        'Look Closer',
        {
          href: `/product/${product.id}`,
        },
      );
      productButton.addEventListener('click', () => {
        if (this.buttonToCatalogCallback) {
          this.buttonToCatalogCallback();
        }
      });
      productButtonLink.append(productButton);
      productItem.append(
        productImage,
        productTitle,
        productPrice,
        productButtonLink,
      );
      featuredProductsList.append(productItem);
    });
    featuredProductsContainer.append(featuredProductsList);
    midSection.append(specialOffersContainer, featuredProductsContainer);

    // reviews
    const reviewsSection = tags.section(['home__reviews', 'section']);
    const reviewsTitle = tags.h2(
      ['home__reviews__title'],
      'Reviews From Our Clients',
    );
    reviewsSection.append(reviewsTitle);

    const reviewsContainer = tags
      .div(['home__reviews__container'])
      .getElement() as HTMLDivElement;
    homeData.reviews.forEach((guide, index) => {
      const guideItem = tags
        .div(['home__reviews__item'])
        .getElement() as HTMLDivElement;
      const guideTitle = tags.p(['home__reviews__item__title'], guide.title);
      const guideDescription = tags.p(
        ['home__reviews__item__description'],
        guide.description,
      );
      const guideBio = tags.span(['home__reviews__item__bio']);
      const guideAuthor = tags.p(
        ['home__reviews__item__bio__author'],
        `By ${guide.author}`,
      );
      const guideAuthorImage = tags.img(
        ['home__reviews__item__bio__author__image'],
        { src: `/images/homepage/authors/author-${index + 1}.jpg` },
      );
      guideBio.append(guideAuthor, guideAuthorImage);
      guideItem.append(guideTitle, guideDescription, guideBio);
      reviewsContainer.append(guideItem);
    });
    reviewsSection.append(reviewsContainer);

    this.container.append(
      topSection,
      terrainSection,
      brandSection,
      midSection,
      reviewsSection,
    );
  }

  public handleClickButtons(
    callback: (
      option: string,
      name: string,
      id: string,
      checked: boolean,
      main?: string,
    ) => void,
  ): void {
    this.container
      .querySelectorAll('.home__category__link')
      .forEach((button) => {
        button.addEventListener('click', (event: Event) => {
          event.preventDefault();
          const target = event.target as HTMLElement;
          const { optiontype, optionname, id, main } = target.dataset;
          const checked = true;
          if (optiontype && optionname && id && main) {
            callback(optiontype, optionname, id, checked, main);
          }
        });
      });
  }

  static toggleHoverEffect(
    targetElement: HTMLElement,
    infoElement: HTMLElement,
    type: 'brand' | 'terrain',
  ): void {
    const transformEffect =
      type === 'brand'
        ? { over: 'translateY(0px)', out: 'translateY(30px)' }
        : { over: 'translateY(0px)', out: 'translateY(30px)' };
    const styles: Partial<CSSStyleDeclaration> = {};
    const handleMouseOver = () => {
      if (window.innerWidth > 1150) {
        styles.opacity = '1';
        styles.transform = transformEffect.over;
        Object.assign(infoElement.style, styles);
      }
    };
    const handleMouseOut = () => {
      styles.opacity = '0';
      styles.transform = transformEffect.out;
      Object.assign(infoElement.style, styles);
    };
    targetElement.addEventListener('mouseover', handleMouseOver);
    targetElement.addEventListener('mouseout', handleMouseOut);
  }

  static createBlock(
    type: 'brand' | 'terrain',
    data: {
      title: string;
      text: string;
      id: string;
      main: string;
      buttonText: string;
    },
    index: number,
  ): HTMLDivElement {
    const containerClass =
      type === 'brand'
        ? 'home__brands__container__item'
        : 'home__terrain__category';
    const linkClass =
      type === 'brand'
        ? ['home__brands__container__item__link', 'home__category__link']
        : ['home__terrain__category__link', 'home__category__link'];
    const imageSrc =
      type === 'brand'
        ? `/images/homepage/brands/${data.title.toLowerCase()}.png`
        : `/images/homepage/terrain/terrain-${index + 1}.png`;
    const blockElement = tags
      .div([containerClass])
      .getElement() as HTMLDivElement;
    const imageElement = tags.img([`${containerClass}__image`], {
      src: imageSrc,
    });
    const infoElement = tags
      .div([`${containerClass}__info`])
      .getElement() as HTMLDivElement;
    const titleElement = tags.h2([`${containerClass}__title`], data.title);
    const textElement = tags.p([`${containerClass}__text`], data.text);
    const buttonLinkElement = tags.a(
      linkClass,
      type === 'brand'
        ? `/brands/${data.title.toLowerCase()}`
        : `terrain/${data.title.toLowerCase()}`,
      '',
    );
    const buttonElement = tags.button(
      [`${containerClass}__button`, 'home__button'],
      data.buttonText,
      {
        'data-optiontype': 'category',
        'data-optionname': data.title,
        'data-id': data.id,
        'data-main': data.main,
        href: `terrain/${data.title.toLowerCase()}`,
      },
    );
    buttonLinkElement.append(buttonElement);
    infoElement.append(titleElement, textElement, buttonLinkElement);
    blockElement.append(imageElement, infoElement);
    HomeView.toggleHoverEffect(blockElement, infoElement, type);
    return blockElement;
  }

  static renderBlocks(
    type: 'brand' | 'terrain',
    data: {
      title: string;
      text: string;
      id: string;
      main: string;
      buttonText: string;
    }[],
    containerElement: HTMLElement,
  ) {
    data.forEach((item, index) => {
      const blockElement = HomeView.createBlock(type, item, index);
      containerElement.append(blockElement);
    });
  }

  public getContent(): HTMLElement {
    return this.container;
  }
}
