import tags from '../../../tags/tags';

export default class FilterOption {
  public FilterContainer: HTMLDivElement;

  public name: string;

  public options?: string[] = [];

  constructor(name: string, options?: string[]) {
    this.options = options;
    this.name = name;
    this.FilterContainer = tags
      .div(['filter__option'])
      .getElement() as HTMLDivElement;
    const FilterHeaderGen = tags.h3(['filter__option__header'], name);

    const FilterListGen = tags.ul(['filter__option__list']);
    if (this.options) {
      this.options.forEach((option) => {
        const FilterItemGen = tags.li(['filter__option__item']);
        const FilterInputGen = tags.input(['option-list__checkbox'], {
          type: 'checkbox',
          id: option,
        });
        FilterInputGen.dataset.optiontype = 'attribute';
        FilterInputGen.dataset.optionname = `${name}`;
        const FilterLabelGen = tags.label(['option-list__label'], option, {
          for: option,
        });
        FilterLabelGen.dataset.optiontype = 'attribute';
        FilterLabelGen.dataset.optionname = `${name}`;
        FilterItemGen.append(FilterInputGen, FilterLabelGen);
        FilterListGen.append(FilterItemGen);
      });
    }
    this.FilterContainer.append(FilterHeaderGen, FilterListGen);
  }

  public getElement() {
    return this.FilterContainer;
  }
}
