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
    const categoriesHeader = tags.h2(['category-header'], 'Categories');
    this.filterSideBar.appendChild(categoriesHeader);
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
      this.filterSideBar.append(categoryContainer);
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

    const minTooltip = tags.span(['tooltip', 'tooltip-min']);
    minTooltip.textContent = priceMinRange.value;

    const maxTooltip = tags.span(['tooltip', 'tooltip-max']);
    maxTooltip.textContent = priceMaxRange.value;

    const minRangeContainer = tags.div(['range-wrapper']).getElement();
    minRangeContainer.append(priceMinRange, minTooltip);

    const maxRangeContainer = tags.div(['range-wrapper']).getElement();
    maxRangeContainer.append(priceMaxRange, maxTooltip);

    priceRangeContainer.append(minRangeContainer, maxRangeContainer);
    this.filterSideBar.append(priceRangeContainer);

    priceMinRange.addEventListener('input', () => {
      minTooltip.textContent = priceMinRange.value;
      FilterSideBar.updateSliderStyles(priceMinRange, priceMaxRange);
    });

    priceMaxRange.addEventListener('input', () => {
      maxTooltip.textContent = priceMaxRange.value;
      FilterSideBar.updateSliderStyles(priceMinRange, priceMaxRange);
    });

    FilterSideBar.updateSliderStyles(priceMinRange, priceMaxRange);
  }

  static updateSliderStyles(
    minSlider: HTMLInputElement,
    maxSlider: HTMLInputElement,
  ) {
    const minSliderCopy = minSlider;
    const maxSliderCopy = maxSlider;
    const minValue =
      ((Number(minSlider.value) - Number(minSlider.min)) /
        (Number(minSlider.max) - Number(minSlider.min))) *
      100;

    const maxValue =
      ((Number(maxSlider.value) - Number(maxSlider.min)) /
        (Number(maxSlider.max) - Number(maxSlider.min))) *
      100;
    console.log('update', minValue, maxValue);
    const primaryColor = '#b88e2f';
    maxSliderCopy.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${maxValue}%, #ddd ${maxValue}%, #ddd 100%)`;
    minSliderCopy.style.background = `linear-gradient(to right, #ddd 0%, #ddd ${minValue}%, ${primaryColor} ${minValue}%, ${primaryColor} 100%)`;
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
}
