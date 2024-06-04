import tags from '../../tags/tags';
import ProductCard from './components/ProductCard';
import FilterSideBar from './components/FilterSideBar';
import { Product, ParsedCategory } from '../../global/interfaces/products';
import BaseComponentGenerator from '../../tags/base-component';

export default class MainView {
  private mainContainer: HTMLDivElement;

  private catalogContainer: HTMLDivElement;

  private catalogPanelContainer: HTMLDivElement;

  private catalogWrapContainer: HTMLDivElement;

  private filterContainer: FilterSideBar;

  constructor() {
    this.mainContainer = tags.div(['main']).getElement() as HTMLDivElement;
    this.filterContainer = new FilterSideBar();
    this.catalogWrapContainer = tags
      .div(['catalog-wrap'])
      .getElement() as HTMLDivElement;
    this.catalogPanelContainer = tags
      .div(['catalog-panel', 'container'])
      .getElement() as HTMLDivElement;

    this.catalogContainer = tags
      .div(['catalog', 'container'], 'Catalog', {})
      .getElement() as HTMLDivElement;
    this.catalogWrapContainer.append(
      this.catalogPanelContainer,
      this.catalogContainer,
    );
    this.mainContainer.append(
      this.filterContainer.getContent(),
      this.catalogWrapContainer,
    );
    this.createTextSearch();
    this.createSortDropdown();
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
    const textSearchInput = this.mainContainer.querySelector(
      '.text-search-input',
    )! as HTMLInputElement;
    textSearchInput.value = '';
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

  public createTextSearch() {
    const textSearchContainer = tags
      .div(['text-search-container'])
      .getElement();
    const textSearchInput = tags.input(['text-search-input'], {
      type: 'text',
      placeholder: 'Search...',
      id: 'textSearchInput',
    });
    const textSearchButton = tags.button(['text-search-button'], '🔍', {
      disabled: 'on',
    });

    textSearchContainer.append(textSearchInput, textSearchButton);
    this.catalogPanelContainer.append(textSearchContainer);
  }

  public createSortDropdown() {
    const sortDropdownContainer = tags
      .div(['sort-dropdown-container'])
      .getElement();
    const sortDropdownLabel = tags.label(['sort-dropdown-label'], 'Sort by:');
    const sortDropdown = new BaseComponentGenerator({
      tag: 'select',
      classNames: ['sort-dropdown'],
      attributes: {
        name: 'sort-dropdown',
        id: 'sort-dropdown',
      },
    });
    const sorts: {
      name: string;
      value: string;
    }[] = [
      { name: 'Name: A-Z', value: 'name.en-US asc' },
      { name: 'Name: Z-A', value: 'name.en-US desc' },
      { name: 'Price: low to high', value: 'price asc' },
      { name: 'Price: high to low', value: 'price desc' },
    ];
    sorts.forEach((sort) => {
      const option = new BaseComponentGenerator({
        tag: 'option',
        classNames: ['sort-dropdown__option'],
        attributes: {
          value: sort.value,
        },
        content: sort.name,
      });
      sortDropdown.appendChild(option);
    });
    sortDropdownContainer.append(sortDropdownLabel, sortDropdown.getElement());
    this.catalogPanelContainer.append(sortDropdownContainer);
  }

  public bindSortDropdown(callback: (value: string) => void): void {
    const sortDropdown = this.catalogPanelContainer.querySelector(
      '.sort-dropdown',
    ) as HTMLSelectElement;
    if (sortDropdown) {
      sortDropdown.addEventListener('change', () => {
        callback(sortDropdown.value);
      });
    }
  }

  public bindTextSearch(callback: (value: string) => void): void {
    const textSearchButton = this.catalogPanelContainer.querySelector(
      '.text-search-button',
    ) as HTMLButtonElement;
    const textSearchInput = this.catalogPanelContainer.querySelector(
      '.text-search-input',
    ) as HTMLInputElement;
    textSearchInput.addEventListener('input', () => {
      if (textSearchInput.value.length > 0) {
        textSearchButton.disabled = false;
      } else {
        textSearchButton.disabled = true;
      }
    });
    if (textSearchInput && textSearchButton) {
      textSearchButton.addEventListener('click', () => {
        callback(textSearchInput.value);
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !textSearchButton.disabled) {
          callback(textSearchInput.value);
        }
      });
    }
  }
}
