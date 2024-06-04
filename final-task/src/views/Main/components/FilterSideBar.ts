import tags from '../../../tags/tags';
import { ParsedCategory } from '../../../global/interfaces/products';
import FilterOption from './FilterOption';

export default class FilterSideBar {
  private filterSideBar: HTMLDivElement;

  constructor() {
    const filterGen = tags.div(['filter-side-bar']);
    this.filterSideBar = filterGen.getElement() as HTMLDivElement;
    const apllyButton = tags.button(['filter-side-bar__apply-button'], 'Apply');
    const resetButton = tags.button(['filter-side-bar__reset-button'], 'Reset');

    this.filterSideBar.append(apllyButton, resetButton);

    this.createPriceRangeSlider();
    this.createAttributeList();
  }

  public createOptionList(categories: Map<string, ParsedCategory>) {
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
      subCategories.forEach(({ id, name }) => {
        const listItem = tags.li(['option-list__item']);
        const checkbox = tags.input(['option-list__checkbox'], {
          type: 'checkbox',
        });
        checkbox.id = id;
        checkbox.name = name;
        checkbox.dataset.optiontype = 'category';
        checkbox.dataset.optionname = `${name}`;
        const label = tags.label(['option-list__label'], name, {
          for: id,
        });
        label.dataset.optiontype = 'category';
        label.dataset.optionname = `${name}`;
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        optionList.appendChild(listItem);
      });

      categoryContainer.appendChild(optionList);
      this.filterSideBar.appendChild(categoryContainer);
    });
  }

  private createPriceRangeSlider() {
    const priceRangeContainer = tags
      .div(['price-range-container'])
      .getElement() as HTMLDivElement;
    const priceMinRange = tags.input(['price-range-min'], {
      type: 'range',
      min: '0',
      max: '500',
      value: '0',
    });
    priceMinRange.dataset.optiontype = 'price';
    const priceMaxRange = tags.input(['price-range-max'], {
      type: 'range',
      min: '500',
      max: '1000',
      value: '1000',
    });
    priceMaxRange.dataset.optiontype = 'price';
    priceRangeContainer.append(priceMinRange, priceMaxRange);
    this.filterSideBar.append(priceRangeContainer);
  }

  public createAttributeList() {
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
}
