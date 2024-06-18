import tags from '../../tags/tags';

export default class HomeView {
  private container: HTMLDivElement;

  public buttonToCatalogCallback: ((event?: Event) => void) | undefined;

  constructor() {
    this.container = tags.div(['home']).getElement() as HTMLDivElement;

    const topSection = tags.section(['home__top', 'section']);
    const terrainSection = tags.section(['home__terrain', 'section']);
    const brandSection = tags.section(['home__brands', 'section']);
    const midSection = tags.section(['home__mid', 'section']);
    const descriptionContainer = tags
      .div(['home__description'])
      .getElement() as HTMLDivElement;
    const descriptionTitle = tags.h1(
      ['home__description__title'],
      `Celebrate the 40th anniversary of the GNU Project! `,
    );
    const descriptionText = tags.p(
      ['home__description__text'],
      'Save 30% on any board!',
    );
    const descriptionButton = tags.button(
      ['home__description__button', 'home__button', 'home__category__link'],
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
    const midTitle = tags.h1(
      ['home__mid__title'],
      'You can find board for every terrain!',
    );
    terrainSection.append(midTitle);
    const categories = [
      {
        title: 'Freeride',
        text: 'For the adventurer seeking untouched snow.',
        id: 'ab20b56d-b8db-4822-b439-21707a5ebc6f',
        main: 'Terrain',
        buttonText: 'Explore Now',
      },
      {
        title: 'Freestyle',
        text: 'For the trickster mastering the park.',
        id: '62afad2d-349f-4bc6-b33d-d69294521a9b',
        main: 'Terrain',
        buttonText: 'Trick Now',
      },
      {
        title: 'All-Mountain',
        text: 'For the rider who is brave enough',
        id: '441d95e2-71c7-4508-ae11-cc9593f4cb0c',
        main: 'Terrain',
        buttonText: 'Conquer Now',
      },
      {
        title: 'Powder',
        text: 'For the enthusiast who loves deep snow.',
        id: 'c26ae1c9-ac8c-4ebb-b65c-97fd3a198e05',
        main: 'Terrain',
        buttonText: 'Enjoy Now',
      },
    ];
    const categoriesContainer = tags
      .div(['home__terrain__categories'])
      .getElement() as HTMLDivElement;

    HomeView.renderBlocks('terrain', categories, categoriesContainer);
    terrainSection.append(categoriesContainer);

    const specialOffersContainer = tags
      .div(['home__special-offers'])
      .getElement() as HTMLDivElement;
    const specialOffersTitle = tags.h2(
      ['home__special-offers__title'],
      'Special Offers',
    );
    specialOffersContainer.append(specialOffersTitle);
    const offerItems = [
      {
        title: 'Better Together!',
        discount: `SS798<br>20% OFF`,
        button: 'Shop Now',
      },
      {
        title: 'Summer Sale',
        discount: `FA345 <br>30% OFF`,
        button: 'Shop Now',
      },
    ];
    offerItems.forEach((offer, index) => {
      const offerItem = tags
        .div(['home__special-offers__item'])
        .getElement() as HTMLDivElement;
      offerItem.style.backgroundImage = `url(../../public/images/homepage/offers/offer${index + 1}.jpg)`;
      const offerTitle = tags.h3(
        ['home__special-offers__item__title'],
        offer.title,
      );
      const offerDiscount = tags.h2(['home__special-offers__item__discount']);
      offerDiscount.innerHTML = offer.discount;
      const offerButton = tags.button(
        ['home__special-offers__item__button', 'home__button'],
        offer.button,
      );
      offerButton.addEventListener('click', () => {
        if (this.buttonToCatalogCallback) {
          this.buttonToCatalogCallback();
        }
      });
      offerItem.append(offerDiscount, offerTitle, offerButton);
      specialOffersContainer.append(offerItem);
    });
    const featuredProductsContainer = tags
      .div(['home__featured-products'])
      .getElement() as HTMLDivElement;
    const featuredProductsTitle = tags.h2(
      ['home__featured-products__title'],
      'Featured Products',
    );
    featuredProductsContainer.append(featuredProductsTitle);

    const products = [
      {
        title: 'Lib Tech T.Rice Pro HP C2',
        price: '$ 367.49',
        id: 'a0d2261b-28f1-4487-bc49-cf92dd2f2fc2',
      },
      {
        title: 'CAPiTA Mega Mercury',
        price: '$ 559.96',
        id: '20aa903b-231e-4cc4-9c72-0b4e28598081',
      },
      {
        title: 'Burton Feelgood Flying V',
        price: '$ 433.96',
        id: 'c013ed35-f8ba-483a-a2ad-015cc435695b',
      },
      {
        title: 'GNU Asym Velvet C2',
        price: '$ 384.99',
        id: '8bdece6b-970a-4387-82e4-6875ce726b4b',
      },
      {
        title: 'K2 Dreamsicle',
        price: '$ 269.97',
        id: '768bbfa7-4a08-4726-a0e8-db1d38e78522',
      },
      {
        title: 'Rossignol Myth',
        price: '$ 259.97',
        id: 'a2a60562-66ec-4d2a-816c-76dd4c560b2d',
      },
    ];
    const featuredProductsList = tags
      .div(['home__featured-products__list'])
      .getElement() as HTMLDivElement;
    products.forEach((product, index) => {
      const productItem = tags
        .div(['home__featured-products__item'])
        .getElement() as HTMLDivElement;
      const productImage = tags.img(['home__featured-products__item__image'], {
        src: `../../public/images/homepage/products/product-${index}.jpg`,
      });
      const productTitle = tags.p(
        ['home__featured-products__item__title'],
        product.title,
      );
      const productPrice = tags.span(
        ['home__featured-products__item__price'],
        product.price,
      );
      const productButtonLink = tags.a(
        ['home__featured-products__item__button__link'],
        `/product/${product.id}`,
      );
      const productButton = tags.button(
        ['home__featured-products__item__button'],
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
    const brandsTitle = tags.h2(['home__brands__title'], 'Our Brands');
    const brandsContainer = tags
      .div(['home__brands__container'])
      .getElement() as HTMLDivElement;

    const brands = [
      {
        title: 'Lib-Tech',
        text: 'The belief that anything is possible',
        id: '9c393b21-2d93-4895-848c-02117bc26b3e',
        main: 'Brand',
        buttonText: 'Shop Now',
      },
      {
        title: 'Capita',
        text: 'Hand-crafted - with 100% clean energy',
        id: 'bc4912ad-fd98-4287-bcb7-8e11e4efbe42',
        main: 'Brand',
        buttonText: 'Shop Now',
      },
      {
        title: 'Ride',
        text: 'For the People',
        id: '3daa511b-ecc5-433d-8661-27f8565d81ce',
        main: 'Brand',
        buttonText: 'Shop Now',
      },
      {
        title: 'Burton',
        text: 'We Are Riders',
        id: '9369379d-b02f-46c7-abc8-a875223d2312',
        main: 'Brand',
        buttonText: 'Shop Now',
      },
    ];
    HomeView.renderBlocks('brand', brands, brandsContainer);

    brandSection.append(brandsTitle, brandsContainer);
    const reviewsSection = tags.section(['home__reviews', 'section']);
    const reviewsTitle = tags.h2(
      ['home__reviews__title'],
      'Reviews From Our Clients',
    );
    reviewsSection.append(reviewsTitle);

    const guides = [
      {
        title: 'Awfull place!',
        description:
          'Back in my day, we rode down hills in plastic bags, not on those frivolous, brightly colored boards.',
        author: 'Merl',
      },
      {
        title: 'Resilient Revelations',
        description:
          'When I fell off the lift into the snowdrift, I realized how durable these boards are - not at all like my broken dreams and more stylish.',
        author: 'Harold',
      },
      {
        title: 'Pleasant prices!',
        description:
          'Great sale prices saved me money on post-season treatments.',
        author: 'John',
      },
    ];
    const reviewsContainer = tags
      .div(['home__reviews__container'])
      .getElement() as HTMLDivElement;
    guides.forEach((guide, index) => {
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
        ['home__reviews__item__author'],
        `By ${guide.author}`,
      );
      const guideAuthorImage = tags.img(
        ['home__reviews__item__author__image'],
        { src: `../../public/images/homepage/authors/author-${index + 1}.jpg` },
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
          console.log(target);
          const { optiontype, optionname, id, main } = target.dataset;
          const checked = true;
          console.log(optiontype, optionname, id, main);
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
        : 'home__mid__category';
    const linkClass =
      type === 'brand'
        ? ['home__brands__container__item__link', 'home__category__link']
        : ['home__mid__category__link', 'home__category__link'];
    const imageSrc =
      type === 'brand'
        ? `../../public/images/homepage/brands/${data.title.toLowerCase()}.png`
        : `../../public/images/homepage/terrain/terrain-${index + 1}.png`;
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
    console.log(blockElement, infoElement);
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
