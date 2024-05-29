import { ProductData, Image, Product } from '@commercetools/platform-sdk';
import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';
import '../../styles/producrPage.scss';

export default class ProductPageView {
  private container: BaseComponentGenerator;

  private heroContainer: HTMLDivElement;

  private descriptionContainer: HTMLDivElement;

  private buttonContainer: HTMLDivElement;

  private heroMainImage: HTMLImageElement | undefined;

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
    const buttonCart = tags.button(['product__buttons_cart'], 'Add to cart');
    this.buttonContainer.append(buttonCart);
    this.container.appendChildren([
      this.heroContainer,
      this.descriptionContainer,
      this.buttonContainer,
    ]);
  }

  private renderHeroContainer(images: Image[]): void {
    const heroMainContainer = tags
      .div(['product__hero_main'], '', {})
      .getElement();
    this.heroMainImage = tags.img(['product__hero_main_image'], {
      src: images[0].url,
    });

    const heroLeftContainer = tags
      .div(['product__hero_left', 'alt-column'], '', {})
      .getElement();
    images.forEach((image) => {
      const imageTag = tags.img(['alt-column__image'], {
        src: image.url,
      });
      const imageContainer = tags
        .div(['alt-column__container'], '', {})
        .getElement() as HTMLDivElement;
      imageContainer.append(imageTag);
      imageContainer.addEventListener('click', () => {
        if (this.heroMainImage) {
          this.heroMainImage.src = image.url;
        }
      });
      heroLeftContainer.append(imageContainer);
    });
    this.heroContainer.append(heroLeftContainer);
    heroMainContainer.append(this.heroMainImage);
    this.heroContainer.append(heroMainContainer);
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
