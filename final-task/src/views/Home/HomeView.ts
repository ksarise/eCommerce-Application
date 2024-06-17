import tags from '../../tags/tags';

export default class HomeView {
  private container: HTMLDivElement;

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
      ['home__description__button'],
      'Shop Sale',
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

    const categories = ['Freeride', 'Freestyle', 'All-Mountain', 'Powder'];
    const categoriesContainer = tags
      .div(['home__terrain__categories'])
      .getElement() as HTMLDivElement;
    categories.forEach((category, index) => {
      const terrainCategory = tags
        .div(['home__mid__category'])
        .getElement() as HTMLDivElement;
      const terrainImage = tags.img(['home__mid__category__image'], {
        src: `../../public/images/homepage/terrain/terrain-${index + 1}.png`,
      });
      const terrainInfo = tags
        .div(['home__mid__category__info'])
        .getElement() as HTMLDivElement;
      const terrainTitle = tags.h2(['home__mid__category__title'], category);
      const terrainText = tags.p(['home__mid__category__text'], 'text');
      const terrainButton = tags.button(
        ['home__mid__category__button'],
        'Shop Now',
      );
      terrainInfo.append(terrainTitle, terrainText, terrainButton);
      terrainCategory.append(terrainImage, terrainInfo);
      categoriesContainer.append(terrainCategory);
    });
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
        ['home__special-offers__item__button'],
        offer.button,
      );
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
      { title: 'Lib Tech T.Rice Pro HP C2', price: '$ 367.49' },
      { title: 'CAPiTA Mega Mercury', price: '$ 559.96' },
      { title: 'Burton Feelgood Flying V', price: '$ 433.96' },
      { title: 'GNU Asym Velvet C2', price: '$ 384.99' },
      { title: 'K2 Dreamsicle', price: '$ 269.97' },
      { title: 'Rossignol Myth', price: '$ 259.97' },
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
      const productButton = tags.button(
        ['home__featured-products__item__button'],
        'Look Closer',
      );
      productItem.append(
        productImage,
        productTitle,
        productPrice,
        productButton,
      );
      featuredProductsList.append(productItem);
    });
    featuredProductsContainer.append(featuredProductsList);
    midSection.append(specialOffersContainer, featuredProductsContainer);
    const brandsTitle = tags.h2(['home__brands__title'], 'Our Brands');
    const brandsContainer = tags
      .div(['home__brands__container'])
      .getElement() as HTMLDivElement;
    const brands = ['Lib-Tech', 'Capita', 'Ride', 'Burton'];
    brands.forEach((brand) => {
      const brandsItem = tags
        .div(['home__brands__container__item'])
        .getElement() as HTMLDivElement;
      const brandLink = tags.a(['home__brands__container__item__link'], '');
      const brandImage = tags.img(['home__brands__container__item__image'], {
        src: `../../public/images/homepage/brands/${brand.toLowerCase()}.png`,
      });
      brandLink.append(brandImage);
      const brandText = tags.h2(['home__brands__container__item__text'], brand);
      brandsItem.append(brandLink, brandText);
      brandsContainer.append(brandsItem);
    });
    brandSection.append(brandsTitle, brandsContainer);
    const reviewsSection = tags.section(['home__reviews', 'section']);
    const reviewsTitle = tags.h2(
      ['home__reviews__title'],
      'Reviews From Our Clients',
    );
    reviewsSection.append(reviewsTitle);

    const guides = [
      {
        title: 'Snowboard Gear Guide',
        description:
          'In this guide we will help you choose the best gear for your snowboarding adventures',
        author: 'Dr.',
      },
      {
        title: 'Snowboard Gear Guide',
        description:
          'In this guide we will help you choose the best gear for your snowboarding adventures',
        author: 'Dr.',
      },
      {
        title: 'Snowboard Gear Guide',
        description:
          'In this guide we will help you choose the best gear for your snowboarding adventures',
        author: 'Dr.',
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

  public getContent(): HTMLElement {
    return this.container;
  }
}
