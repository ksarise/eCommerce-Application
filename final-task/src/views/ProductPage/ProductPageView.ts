import Swiper from 'swiper';
import { Navigation, Thumbs, Pagination } from 'swiper/modules';
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

  private modalWindow: HTMLDivElement | undefined;

  private modalContent: HTMLDivElement | undefined;

  private productImages: Image[] = [];

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
    this.productImages = Array.from(
      body.masterData.current.masterVariant.images!,
    );
    this.renderHeroContainer(this.productImages);
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
    const swiperPagination = tags
      .div(['swiper-pagination'], '', {})
      .getElement();
    heroMainContainer.append(swiperPagination);
    heroMainContainer.append(swiperNext);
    heroMainContainer.append(swiperPrev);
    this.heroContainer.append(heroMainContainer);

    const swiperAlt = new Swiper('.altSwiper', {
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 'auto',
    });
    const mainSwiper = new Swiper('.mainSwiper', {
      slidesPerView: 'auto',
      loop: true,
      modules: [Navigation, Thumbs, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperAlt,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
    heroMainContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('swiper-button')) {
        return;
      }
      this.openModalWindow(mainSwiper.realIndex);
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

  private openModalWindow(activeSlide: number): void {
    this.createModalWindow();
    this.renderModalContent(activeSlide);
  }

  private createModalWindow(): void {
    this.modalWindow = tags
      .div(['modal'], '', {})
      .getElement() as HTMLDivElement;
    this.modalWindow.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        this.container.getElement().removeChild(this.modalWindow!);
      }
    });
    const closeButton = tags.span(['modal__close']);
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      this.container.getElement().removeChild(this.modalWindow!);
    });
    this.modalWindow.append(closeButton);
    this.modalContent = tags
      .div(['modal__content', 'swiper', 'modalSwiper'], '', {})
      .getElement() as HTMLDivElement;
    this.modalWindow.append(this.modalContent);
    this.container.appendChild(this.modalWindow);
  }

  private renderModalContent(activeSlide: number): void {
    const swiperWrapperModal = tags
      .div(['swiper-wrapper'], '', {})
      .getElement();
    this.productImages.forEach((image) => {
      const imageTagModal = tags.img(['modal__content_image'], {
        src: image.url,
      });
      const swiperSlideModal = tags
        .div(['swiper-slide'], '', {})
        .getElement() as HTMLDivElement;
      swiperWrapperModal.append(swiperSlideModal);
      swiperSlideModal.append(imageTagModal);
    });
    this.modalContent!.append(swiperWrapperModal);
    const swiperNext = tags
      .div(['swiper-button-next', 'swiper-button'], '', {})
      .getElement();
    const swiperPrev = tags
      .div(['swiper-button-prev', 'swiper-button'], '', {})
      .getElement();
    const swiperPagination = tags
      .div(['swiper-pagination'], '', {})
      .getElement();
    this.modalContent!.append(swiperPagination);
    this.modalContent!.append(swiperNext);
    this.modalContent!.append(swiperPrev);
    // eslint-disable-next-line no-new
    new Swiper('.modalSwiper', {
      slidesPerView: 'auto',
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      initialSlide: activeSlide,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}
