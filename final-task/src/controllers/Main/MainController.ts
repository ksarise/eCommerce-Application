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
    const products = this.mainModel.getProducts();
    this.mainView.renderProducts(products);
    this.mainView.setCategories(this.mainModel.getParsedCategories());
  }
}
