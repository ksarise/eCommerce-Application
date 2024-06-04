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

  public bindOptionList(
    callback: (
      option: string,
      name: string,
      id: string,
      checked: boolean,
    ) => void,
  ): void {
    this.filterContainer
      .getContent()
      .querySelectorAll('.option-list__checkbox')
      .forEach((element: Element) => {
        element.addEventListener('change', (event: Event) => {
          const target = event.target as HTMLInputElement;
          const { optiontype, optionname } = target.dataset;
          const { checked, id } = target;
          console.log(optiontype, optionname);
          if (optiontype && optionname) {
            callback(optiontype, optionname, id, checked);
          }
        });
      });
  }

  public bindApplyFilters(callback: () => void): void {
    const applyButton = this.mainContainer.querySelector(
      '.filter-side-bar__apply-button',
    );
    if (applyButton) {
      applyButton.addEventListener('click', () => {
        callback();
      });
    } else {
      console.error('not found');
    }
  }

  public bindResetFilters(callback: () => void): void {
    const resetButton = this.mainContainer.querySelector(
      '.filter-side-bar__reset-button',
    );
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        callback();
      });
    } else {
      console.error('not found');
    }
  }

  public bindPriceFilter(
    callback: (minValue: number, maxValue: number) => void,
  ): void {
    const priceFilterMin = this.mainContainer.querySelector(
      '.price-range-min',
    ) as HTMLInputElement;
    const priceFilterMax = this.mainContainer.querySelector(
      '.price-range-max',
    ) as HTMLInputElement;

    if (priceFilterMin && priceFilterMax) {
      priceFilterMin.addEventListener('input', () => {
        callback(
          parseInt(priceFilterMin.value, 10),
          parseInt(priceFilterMax.value, 10),
        );
        console.log('change', priceFilterMin.value);
      });
      priceFilterMax.addEventListener('input', () => {
        callback(
          parseInt(priceFilterMin.value, 10),
          parseInt(priceFilterMax.value, 10),
        );
        console.log('change', priceFilterMax.value);
      });
    }
  }

  public clearFilters(): void {
    const checkboxes = this.filterContainer
      .getContent()
      .querySelectorAll(
        '.option-list__checkbox',
      ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(function uncheck(checkbox) {
      const check = checkbox;
      check.checked = false;
    });
    console.log('clear');
    const priceFilterMin = this.mainContainer.querySelector(
      '.price-range-min',
    ) as HTMLInputElement;
    const priceFilterMax = this.mainContainer.querySelector(
      '.price-range-max',
    ) as HTMLInputElement;

    if (priceFilterMin && priceFilterMax) {
      priceFilterMin.value = '0';
      priceFilterMax.value = '1000';
    }
  }
}
