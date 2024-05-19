import AppView from '../views/appView';
import AppModel from '../models/model';
import routerController from '../services/router';

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
    this.initializeLoginListeners();
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

  public initializeLoginListeners() {
    const loginViewVariables = this.appView.loginView;
    loginViewVariables.form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.appModel.postLoginCustomer(
        loginViewVariables.inputEmail.value,
        loginViewVariables.inputPassword.value,
      );
      await loginViewVariables.addListenerToLogin();
    });
    loginViewVariables.inputEmail.addEventListener('input', () => {
      loginViewVariables.addListenerToEmail();
    });
    loginViewVariables.inputPassword.addEventListener('input', () => {
      loginViewVariables.addListenerToPassword();
    });
    loginViewVariables.checkBox.addEventListener('click', () => {
      loginViewVariables.addCheckboxListener();
    });
  }

  public changePage(path: string) {
    this.routerController.goToPage(path);
  }

  public changeContent(page: string) {
    this.appView.renderContent(page);
  }

  public handleClickLoginButton() {
    this.routerController.goToPage('/login');
  }

  public handleClickGoHomeButton() {
    this.routerController.goToPage('/');
  }
}
