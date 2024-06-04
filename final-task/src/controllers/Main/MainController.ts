import MainModel from '../../models/Main/MainModel';
import MainView from '../../views/Main/MainView';

export default class MainController {
  private mainModel: MainModel;

  private mainView: MainView;

  constructor(mainModel: MainModel, mainView: MainView) {
    this.mainModel = mainModel;
    this.mainView = mainView;
  }

  public initialize() {
    this.renderProducts();
    this.mainView.setCategories(this.mainModel.getParsedCategories());
    this.mainView.bindOptionList(this.handleOptionList.bind(this));
    this.mainView.bindPriceFilter(this.handlePriceRangeChange.bind(this));
  }

  private handleOptionList(
    option: string,
    name: string,
    value: string,
    checked: boolean,
  ) {
    this.mainModel.handleOptionListCheck(option, name, value, checked);
    this.mainModel.createFilterResponse();
  }

  private handlePriceRangeChange(minValue: number, maxValue: number) {
    this.mainModel.handlePriceRangeChange(minValue, maxValue);
    this.mainModel.createFilterResponse();
    console.log(this.mainModel.searchQuery);
  }

  public handleResetFilters() {
    this.mainModel.resetFilters();
    this.mainView.clearFilters();
    this.renderProducts();
  }

  public handleSortChange(value: string) {
    if (value !== this.mainModel.sort) {
      this.mainModel.handleSort(value);
      this.renderProducts();
    }
  }

  public renderProducts() {
    const products = this.mainModel.getProducts();
    console.log('render', products);
    this.mainView.renderProducts(products);
  }
}
