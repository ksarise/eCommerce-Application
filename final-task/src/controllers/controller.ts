import AppView from '../views/appView';
import AppModel from '../models/model';
import routerController from '../services/router';
// import { createPasswordFlow } from '../services/client';

export default class AppController {
  public appView: AppView;

  public appModel: AppModel;

  private routerController = routerController;

  constructor() {
    this.appView = new AppView();
    this.appModel = new AppModel();
  }

  public initialize() {
    this.initializeListeners();
    this.appView.create();
    document.querySelector<HTMLDivElement>('.body')!.innerHTML =
      this.appView.innerHTML;
    routerController.handleLocation();
  }

  public initializeListeners() {
    this.routerController.changeContent = this.changeContent.bind(this);
    const customersButton = document.querySelector('.customers');
    customersButton?.addEventListener('click', async () => {
      const customers = await this.appModel.requestGetCustomers();
      console.log(customers);
    });
    this.appView.headerView.handleClickLoginButton =
      this.handleClickLoginButton.bind(this);
    this.appView.notFoundView.handleClickGoHomeButton =
      this.handleClickGoHomeButton.bind(this);
  }

  public changePage(path: string) {
    this.routerController.goToPage(path);
  }

  public changeContent(page: string) {
    this.appView.renderContent(page);
  }

  public async handleClickLoginButton() {
    try {
      // const customers = await this.appModel.requestGetProducts();
      // console.log(customers);
      const body = await this.appModel.requestLogin();
      // const body = await this.appModel.requestGetCustomers();
      // createPasswordFlow();
      setTimeout(async () => {
        this.appModel.createNewApiRoot();
        const body2 = await this.appModel.requestGetProducts();
        console.log(body2);
      }, 2000);
      console.log(body);
    } catch (err) {
      console.log(err);
    }
    this.routerController.goToPage('/login');
  }

  public handleClickGoHomeButton() {
    this.routerController.goToPage('/');
  }
}
