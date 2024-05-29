import { Product, Image } from '@commercetools/platform-sdk';
import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';
import '../../styles/producrPage.scss';

export default class ProductPageView {
  private container: BaseComponentGenerator;

  private heroContainer: HTMLDivElement;

  private descriptionContainer: HTMLDivElement;

  private heroMainImage: HTMLImageElement | undefined;

  constructor() {
    this.container = tags.div(['product'], '', {});
    this.heroContainer = tags
      .div(['product__hero'], '', {})
      .getElement() as HTMLDivElement;
    this.descriptionContainer = tags
      .div(['product__description'], 'descriptionContainer', {})
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
  }

  public createProductPage(): void {
    this.container.appendChildren([
      this.heroContainer,
      this.descriptionContainer,
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
}
