import tags from '../../../tags/tags';

export default class FilterOption {
  public FilterContainer: HTMLDivElement;

  public name: string;

  public options?: { label: string; key: string }[] = [];

  constructor(name: string, options?: { label: string; key: string }[]) {
    this.options = options || [];
    console.log('this.options', this.options);
    this.name = name;
    this.FilterContainer = tags
      .div(['filter__option'])
      .getElement() as HTMLDivElement;
    this.FilterContainer.dataset.optionkey = name;
    const nameForTitle = name
      .replace(/^Specs_/, '')
      .replace(/^SpecsTable_/, '')
      .replace(/([a-z])([A-Z])/g, '$1 $2');
    const FilterHeaderGen = tags.h3(['filter__option__header'], nameForTitle);

    const FilterListGen = tags.ul(['filter__option__list']);
    FilterHeaderGen.addEventListener('click', () => {
      FilterListGen.classList.toggle('filter__option--active');
    });
    if (this.options) {
      this.options.sort((a, b) => a.label.localeCompare(b.label));
      this.options.forEach((option, index) => {
        const FilterItemGen = tags.li(['filter__option__item']);
        const FilterInputGen = tags.input(['option-list__checkbox'], {
          type: 'checkbox',
          id: `checkbox${name}${option.key}${option.label}${index}`,
        });
        FilterInputGen.dataset.optiontype = 'attribute';
        FilterInputGen.dataset.optionattrid = `${option.key}`;
        FilterInputGen.dataset.optionname = `${name}`;
        const FilterLabelGen = tags.label(
          ['option-list__label'],
          option.label
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/,/g, ', ')
            .replace(/(\d)([A-Z])/g, '$1 $2'),
          {
            for: option.key,
          },
        );
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
