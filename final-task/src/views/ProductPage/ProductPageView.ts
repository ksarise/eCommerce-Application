import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductData, Image, Product } from '@commercetools/platform-sdk';
import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';
import '../../styles/productPage.scss';

export default class ProductPageView {
  private container: BaseComponentGenerator;

  private heroContainer: HTMLDivElement;

  private descriptionContainer: HTMLDivElement;

  private buttonContainer: HTMLDivElement;

  constructor() {
    this.container = tags.div(['product'], '', {});
    this.heroContainer = tags
      .div(['product__hero'], '', {})
      .getElement() as HTMLDivElement;
    this.descriptionContainer = tags
      .div(['product__description'], '', {})
      .getElement() as HTMLDivElement;
    this.buttonContainer = tags
      .div(['product__buttons'], '', {})
      .getElement() as HTMLDivElement;
  }

  public getContent(): HTMLElement {
    return this.container.getElement();
  }

  public create() {
    this.createProductPage();
  }

  public render(body: Product) {
    this.renderHeroContainer(body.masterData.current.masterVariant.images!);
    this.renderDestiptionContainer(body.masterData.current);
  }

  public createProductPage(): void {
    const buttonCart = tags.button(['product__buttons_cart'], 'Add To Cart');
    this.buttonContainer.append(buttonCart);
    const rightContainer = tags
      .div(['product__right-container'], '', {})
      .getElement();
    rightContainer.append(this.descriptionContainer);
    rightContainer.append(this.buttonContainer);
    this.container.appendChildren([this.heroContainer, rightContainer]);
  }

  private renderHeroContainer(images: Image[]): void {
    const heroMainContainer = tags
      .div(['product__hero_main', 'swiper', 'mainSwiper'], '', {})
      .getElement();
    const swiperWrapperMain = tags.div(['swiper-wrapper'], '', {}).getElement();
    const swiperWrapperAlt = tags.div(['swiper-wrapper'], '', {}).getElement();
    const heroLeftContainer = tags
      .div(['product__hero_left', 'alt-column', 'swiper', 'altSwiper'], '', {})
      .getElement();
    images.forEach((image) => {
      const imageTagLeft = tags.img(['alt-column__image'], {
        src: image.url,
      });
      const imageTagMain = tags.img(['product__main_image'], {
        src: image.url,
      });
      const swiperSlideMain = tags
        .div(['swiper-slide'], '', {})
        .getElement() as HTMLDivElement;
      swiperWrapperMain.append(swiperSlideMain);
      swiperSlideMain.append(imageTagMain);
      const swiperSlideAlt = tags.div(['swiper-slide'], '', {}).getElement();
      swiperWrapperAlt.append(swiperSlideAlt);
      swiperSlideAlt.append(imageTagLeft);
      heroLeftContainer.append(swiperWrapperAlt);
    });
    this.heroContainer.append(heroLeftContainer);
    heroMainContainer.append(swiperWrapperMain);
    const swiperNext = tags
      .div(['swiper-button-next', 'swiper-button'], '', {})
      .getElement();
    const swiperPrev = tags
      .div(['swiper-button-prev', 'swiper-button'], '', {})
      .getElement();
    heroMainContainer.append(swiperNext);
    heroMainContainer.append(swiperPrev);
    this.heroContainer.append(heroMainContainer);

    const swiperAlt = new Swiper('.altSwiper', {
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 'auto',
    });

    // eslint-disable-next-line no-new
    new Swiper('.mainSwiper', {
      slidesPerView: 'auto',
      loop: true,
      modules: [Navigation, Thumbs],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperAlt,
      },
    });
  }

  private renderDestiptionContainer(current: ProductData): void {
    const nameTag = tags.h2(['product__name'], current.name['en-US']);
    const descriptionTag = tags.p(
      ['product__description'],
      current.description!['en-US'],
    );
    const price = current.masterVariant.prices![0].value.centAmount;
    const currency = current.masterVariant.prices![0].value.currencyCode;
    let currencyTag = '$';
    switch (currency) {
      case 'USD':
        currencyTag = '$';
        break;
      case 'EUR':
        currencyTag = '€';
        break;
      case 'RUB':
        currencyTag = '₽';
        break;
      default:
        break;
    }
    const priceTag = tags.p(
      ['product__price'],
      `${currencyTag}${(price / 100).toString()}`,
    );
    this.descriptionContainer.append(nameTag);
    this.descriptionContainer.append(priceTag);
    this.descriptionContainer.append(descriptionTag);
  }
}
