import { DiscountCode } from '@commercetools/platform-sdk';
import tags from '../../tags/tags';
import ProductCard from './components/ProductCard';
import FilterSideBar from './components/FilterSideBar';
import { Product, ParsedCategory } from '../../global/interfaces/products';
import BaseComponentGenerator from '../../tags/base-component';
import DiscountBanner from './components/DiscountBanner';

export default class MainView {
  private mainContainer: HTMLDivElement;

  private catalogListContainer: HTMLDivElement;

  private catalogPanelContainer: HTMLDivElement;

  private catalogWrapContainer: HTMLDivElement;

  private catalogContainer: HTMLDivElement;

  private filterContainer: FilterSideBar;

  private breadcrumbContainer: HTMLDivElement;

  private catalogPromoCodes: HTMLElement;

  public productCards: ProductCard[] = [];

  constructor() {
    this.mainContainer = tags.div(['main']).getElement() as HTMLDivElement;
    this.catalogPromoCodes = tags.div(['promocode']).getElement();
    this.filterContainer = new FilterSideBar();
    this.catalogContainer = tags
      .div(['catalog'])
      .getElement() as HTMLDivElement;
    this.catalogPanelContainer = tags
      .div(['catalog__panel', 'container'])
      .getElement() as HTMLDivElement;
    const filtersBtn = tags.button(['catalog__filters__btn'], 'Open Filters');
    filtersBtn.addEventListener('click', () => {
      this.filterContainer.toggleSideBar();
    });
    this.catalogPanelContainer.append(filtersBtn);
    this.catalogListContainer = tags
      .div(['catalog__list', 'container'], '', {})
      .getElement() as HTMLDivElement;
    this.catalogContainer.append(
      this.catalogPanelContainer,
      this.catalogListContainer,
    );
    this.catalogWrapContainer = tags
      .div(['catalog__wrap'])
      .getElement() as HTMLDivElement;
    this.breadcrumbContainer = tags
      .div(['breadcrumb-container'])
      .getElement() as HTMLDivElement;
    const breadcrumbHomeItem = tags.span(['breadcrumb-item'], 'Home >');
    const breadcrumbCatalogItem = tags.a(['breadcrumb-item'], '/', 'Catalog >');
    this.breadcrumbContainer.append(breadcrumbHomeItem, breadcrumbCatalogItem);
    this.catalogWrapContainer.append(
      this.filterContainer.getContent(),
      this.catalogContainer,
    );
    this.createTextSearch();
    this.createSortDropdown();
    this.mainContainer.append(
      this.catalogPromoCodes,
      this.breadcrumbContainer,
      this.catalogWrapContainer,
    );
  }

  public getContent(): HTMLElement {
    return this.mainContainer;
  }

  public async renderProducts(
    products: Product[],
    variantsInCart: { [key: string]: string }[],
    bindClickCallback: (
      isAdd: boolean,
      parentId: string,
      variantId: number,
    ) => void,
  ) {
    this.productCards = products.map((product: Product) => {
      const productCard = new ProductCard(
        product.name,
        product.desc,
        product.image,
        product.id,
        product.price,
        product.discount,
        product.sizesList,
        variantsInCart,
        bindClickCallback,
      );
      this.catalogListContainer.append(productCard.renderCard());
      return productCard;
    });
  }

  public setCategories(categories: Map<string, ParsedCategory>) {
    this.filterContainer.createOptionList(categories);
  }

  public bindCategoryList(
    callback: (
      option: string,
      name: string,
      id: string,
      checked: boolean,
      main?: string,
    ) => void,
  ): void {
    this.filterContainer
      .getContent()
      .querySelectorAll('.option-list__link')
      .forEach((element: Element) => {
        element.addEventListener('click', (event: Event) => {
          event.preventDefault();
          const target = event.target as HTMLAnchorElement;
          const { optiontype, optionname, id, main } = target.dataset;
          const checked = true;
          if (optiontype && optionname && id && main) {
            callback(optiontype, optionname, id, checked, main);
            this.filterContainer
              .getContent()
              .querySelectorAll('.category-container')
              .forEach((category) =>
                category.classList.toggle('category-container_hidden'),
              );
            this.filterContainer.toggleSideBar();
            this.updateBreadcrumb([main, optionname]);
          }
        });
      });
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
          if (optiontype && optionname) {
            callback(optiontype, optionname, id, checked);
          }
        });
      });
  }

  public bindApplyFilters(callback: () => void): void {
    const applyButton = this.catalogWrapContainer.querySelector(
      '.filter-side-bar__apply-button',
    );
    if (applyButton) {
      applyButton.addEventListener('click', () => {
        this.filterContainer.toggleSideBar();
        callback();
      });
    } else {
      console.error('not found');
    }
  }

  public bindResetFilters(callback: () => void): void {
    const resetButton = this.catalogWrapContainer.querySelector(
      '.filter-side-bar__reset-button',
    );
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        callback();
        this.clearBreadcrumb();
      });
    } else {
      console.error('not found');
    }
  }

  public bindPriceFilter(
    callback: (minValue: number, maxValue: number) => void,
  ): void {
    const priceFilterMin = this.catalogWrapContainer.querySelector(
      '.price-range-min',
    ) as HTMLInputElement;
    const priceFilterMax = this.catalogWrapContainer.querySelector(
      '.price-range-max',
    ) as HTMLInputElement;

    if (priceFilterMin && priceFilterMax) {
      priceFilterMin.addEventListener('input', () => {
        callback(
          parseInt(priceFilterMin.value, 10),
          parseInt(priceFilterMax.value, 10),
        );
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
    const textSearchInput = this.catalogWrapContainer.querySelector(
      '.text-search-input',
    )! as HTMLInputElement;
    textSearchInput.value = '';
    const priceFilterMin = this.catalogWrapContainer.querySelector(
      '.price-range-min',
    ) as HTMLInputElement;
    const priceFilterMax = this.catalogWrapContainer.querySelector(
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

  public updateBreadcrumb(categoryNames: string[]) {
    this.clearBreadcrumb();
    let pathname = '/categories';
    categoryNames.forEach((categoryName) => {
      pathname += `/${categoryName.toLowerCase()}`;
      const breadcrumbItem = tags.a(
        ['breadcrumb-item'],
        pathname,
        `${categoryName}>`,
      );
      this.breadcrumbContainer.appendChild(breadcrumbItem);
    });
  }

  private clearBreadcrumb() {
    this.breadcrumbContainer.innerHTML = '';
    const breadcrumbHomeItem = tags.a(['breadcrumb-item'], '/', 'Home >');
    const breadcrumbCatalogItem = tags.a(['breadcrumb-item'], '/', 'Catalog >');
    this.breadcrumbContainer.prepend(breadcrumbHomeItem, breadcrumbCatalogItem);
  }

  public createPromoCodes(codes: DiscountCode[]) {
    codes.forEach((code) => {
      const banner = new DiscountBanner(
        code.name?.['en-US'],
        code.description?.['en-US'],
        code.code,
      );
      const block = banner.getBanner();
      this.catalogPromoCodes.append(block);
    });
  }

  public updateProductCards(
    productCardId: string,
    newVariantsInCart: { [key: string]: string }[],
  ) {
    const updatedCard = this.productCards.find(
      (productCard) => productCard.id === productCardId,
    );
    if (updatedCard) {
      updatedCard.variantsInCart = newVariantsInCart;
      updatedCard.updateSizeItemClasses();
    }
  }

  public showSkeletons(limit: number) {
    for (let i = 0; i < limit; i += 1) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton skeleton-card';
      skeleton.innerHTML = `
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      `;
      this.catalogListContainer.append(skeleton);
    }
  }

  public removeSkeletons() {
    const skeletons = this.catalogListContainer.querySelectorAll('.skeleton');
    skeletons.forEach((skeleton) => skeleton.remove());
  }

  public clearCatalogList() {
    this.catalogListContainer.innerHTML = '';
  }
}
