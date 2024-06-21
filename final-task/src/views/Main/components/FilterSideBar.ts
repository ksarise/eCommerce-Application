import tags from '../../../tags/tags';
import { ParsedCategory } from '../../../global/interfaces/products';
import FilterOption from './FilterOption';
import PriceRangeSlider from './RangeSlider';

export default class FilterSideBar {
  private filterSideBar: HTMLDivElement;

  public PriceRangeSlider: PriceRangeSlider;

  constructor() {
    console.log('render sidebar');
    const filterGen = tags.div(['filter-side-bar']);
    this.filterSideBar = filterGen.getElement() as HTMLDivElement;
    const apllyButton = tags.button(['filter-side-bar__apply-button'], 'Apply');
    const resetButton = tags.button(['filter-side-bar__reset-button'], 'Reset');
    this.PriceRangeSlider = new PriceRangeSlider(
      this.handlePriceRangeChange.bind(this),
    );
    this.filterSideBar.append(
      apllyButton,
      resetButton,
      this.PriceRangeSlider.getElement(),
    );

    // this.createPriceRangeSlider();
    this.createAttributeList();
  }

  public createOptionList(categories: Map<string, ParsedCategory>) {
    const categoriesHead = tags
      .div(['categories-head'])
      .getElement() as HTMLDivElement;
    const categoriesHeader = tags.h2(['categories-header'], 'Categories');
    const categoriesHeadButton = tags.button(['categories-head__button'], 'X');
    categoriesHeadButton.addEventListener('click', () => {
      this.toggleSideBar();
    });
    categoriesHead.append(categoriesHeader, categoriesHeadButton);
    categoriesHeader.addEventListener('click', () => {
      this.filterSideBar
        .querySelectorAll('.category-container')
        .forEach((category) =>
          category.classList.toggle('category-container_hidden'),
        );
    });
    const categoriesList = tags
      .div(['category-list'])
      .getElement() as HTMLDivElement;
    categoriesList.prepend(categoriesHead);
    categories.forEach(({ name: mainCategoryName, subCategories }) => {
      const categoryContainer = tags
        .div(['category-container'])
        .getElement() as HTMLDivElement;
      const categoryHeader = tags.h3(
        ['category-header'],
        mainCategoryName.replace(/(?!^)([A-Z])/, ' $1'),
      );
      categoryContainer.appendChild(categoryHeader);
      const optionList = tags.ul(['option-list']);
      subCategories.sort((a, b) => a.name.localeCompare(b.name));
      subCategories.forEach(({ id, name }) => {
        const listItem = tags.li(['option-list__item']);
        const link = tags.a(
          ['option-list__link'],
          `/catalog/categories/${mainCategoryName.toLowerCase()}/${name.toLowerCase()}`,
          name,
          {
            'data-optiontype': 'category',
            'data-optionname': name,
            'data-id': id,
            'data-main': mainCategoryName,
          },
        );
        listItem.appendChild(link);
        optionList.appendChild(listItem);
      });

      categoryContainer.appendChild(optionList);
      categoriesList.appendChild(categoryContainer);
    });
    this.filterSideBar.prepend(categoriesList);
  }

  public createAttributeList() {
    const attributesHeader = tags.h2(['attributes-header'], 'Attributes');
    this.filterSideBar.appendChild(attributesHeader);
    const categoryContainer = tags
      .div(['attributes-container'])
      .getElement() as HTMLDivElement;
    const widthContainer = new FilterOption('Width', ['Regular', 'Wide']);
    const coreContainer = new FilterOption('Core-Laminates', [
      'Basalt, Wood',
      'Bamboo, Carbon, Wood',
      'Bamboo, Wood',
      'Wood',
      'Carbon, Wood',
      'Carbon, Flax, Wood',
    ]);
    categoryContainer.append(
      widthContainer.getElement(),
      coreContainer.getElement(),
    );
    this.filterSideBar.appendChild(categoryContainer);
  }

  public getContent() {
    return this.filterSideBar as HTMLDivElement;
  }

  public toggleSideBar() {
    if (this.filterSideBar.classList.contains('visible')) {
      this.filterSideBar.classList.remove('visible');
    } else if (window.innerWidth < 1150) {
      this.filterSideBar.classList.add('visible');
    }
  }
}
