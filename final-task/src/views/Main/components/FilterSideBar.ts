import tags from '../../../tags/tags';
import { ParsedCategory } from '../../../global/interfaces/products';

export default class FilterSideBar {
  private filterSideBar: HTMLDivElement;

  constructor() {
    const filterGen = tags.div(['filter-side-bar']);
    this.filterSideBar = filterGen.getElement() as HTMLDivElement;
  }

  public createOptionList(categories: Map<string, ParsedCategory>) {
    categories.forEach(({ name: mainCategoryName, subCategories }) => {
      const categoryContainer = tags
        .div(['category-container'])
        .getElement() as HTMLDivElement;

      const categoryHeader = tags.h3(['category-header'], mainCategoryName);
      categoryContainer.appendChild(categoryHeader);

      const optionList = tags.ul(['option-list']);
      subCategories.forEach((subCategory) => {
        const listItem = tags.li(['option-list__item']);

        const checkbox = tags.input(['option-list__checkbox'], {
          type: 'checkbox',
          id: subCategory,
          name: subCategory,
        });

        const label = tags.label(['option-list__label'], subCategory, {
          for: subCategory,
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        optionList.appendChild(listItem);
      });

      categoryContainer.appendChild(optionList);
      this.filterSideBar.appendChild(categoryContainer);
    });
  }

  public getContent() {
    return this.filterSideBar as HTMLDivElement;
  }
}
