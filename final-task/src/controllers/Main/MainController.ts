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
  }

  public handleResetFilters() {
    this.mainModel.resetFilters();
    this.mainView.clearFilters();
    this.renderProducts();
  }

  public renderProducts() {
    const products = this.mainModel.getProducts();
    this.mainView.renderProducts(products);
  }
}
