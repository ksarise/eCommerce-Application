import tags from '../../tags/tags';
import ProductCard from './components/ProductCard';
import FilterSideBar from './components/FilterSideBar';
import { Product, ParsedCategory } from '../../global/interfaces/products';

export default class MainView {
  private mainContainer: HTMLDivElement;

  private catalogContainer: HTMLDivElement;

  private filterContainer: FilterSideBar;

  constructor() {
    this.mainContainer = tags.div(['main']).getElement() as HTMLDivElement;
    this.filterContainer = new FilterSideBar();
    this.catalogContainer = tags
      .div(['catalog', 'container'], 'Catalog', {})
      .getElement() as HTMLDivElement;
    this.mainContainer.append(
      this.filterContainer.getContent(),
      this.catalogContainer,
    );
  }

  public getContent(): HTMLElement {
    return this.mainContainer;
  }

  public renderProducts(products: Product[]) {
    console.log('products', products);
    this.catalogContainer.innerHTML = '';

    products.forEach((product: Product) => {
      const productCard = new ProductCard(
        product.name,
        product.desc,
        product.image,
        product.id,
        product.price,
        product.discount,
      );
      this.catalogContainer.append(productCard.renderCard());
    });
  }

  public setCategories(categories: Map<string, ParsedCategory>) {
    this.filterContainer.createOptionList(categories);
  }
}
