import { type ErrorResponse } from '@commercetools/platform-sdk';
import AppView from '../views/appView';
import AppModel from '../models/appModel';
import routerController from '../services/router';
import RegistrationController from './Registration/RegistrationController';
import showToast from '../services/ToastMessages';
import { RegistrationFormData } from '../types/types';

export default class AppController {
  public appView: AppView;

  public appModel: AppModel;

  private routerController = routerController;

  private registrationController: RegistrationController;

  constructor() {
    this.appView = new AppView();
    this.appModel = new AppModel();
    this.registrationController = new RegistrationController(
      this.appView.registrationView,
      this.appModel.registrationModel,
    );
    this.appView.registrationView.bindFormSubmit(
      this.handleRegistrationFormSubmit.bind(this),
    );
  }

  public initialize() {
    this.initializeListeners();
    this.initializeLoginListeners();
    this.appView.create();
    this.registrationController.init();
    document.querySelector<HTMLDivElement>('.body')!.innerHTML =
      this.appView.innerHTML;
    routerController.handleLocation();
    this.handleVisiblityButtons();
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
    this.appView.headerView.handleClickRegistrationButton =
      this.handleClickRegistrationButton.bind(this);
    this.appView.headerView.handleClickLogoutButton =
      this.handleClickLogoutButton.bind(this);
    this.appView.notFoundView.handleClickGoHomeButton =
      this.handleClickGoHomeButton.bind(this);
  }

  public initializeLoginListeners() {
    const loginViewVariables = this.appView.loginView;
    loginViewVariables.form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const result: { result: boolean; obj: unknown } =
        await this.appModel.postLoginCustomer(
          loginViewVariables.inputEmail.value,
          loginViewVariables.inputPassword.value,
        );
      if (result.result) {
        await loginViewVariables.addListenerToLogin();
        this.routerController.goToPage('/');
        this.handleVisiblityButtons();
      } else {
        loginViewVariables.addPopUpWithError(result.obj as string);
      }
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
    loginViewVariables.cross.addEventListener('click', () => {
      loginViewVariables.addCrossListener();
    });
  }

  private async handleRegistrationFormSubmit(formData: RegistrationFormData) {
    const errors = this.appModel.registrationModel.validateForm(formData);
    if (Object.keys(errors).length === 0) {
      await this.createCustomer(formData);
    } else {
      showToast({
        text: 'Form validation errors',
        type: 'negative',
      });
      Object.entries(errors).forEach(([field, errorMessages]) => {
        this.appView.registrationView.displayFieldError(
          field,
          errorMessages[0],
        );
      });
    }
  }

  public async createCustomer(formData: RegistrationFormData) {
    try {
      const response = await this.appModel.createCustomer(formData);
      showToast({
        text: `Customer created with ID: ${response.body.customer.id}`,
        type: 'positive',
      });
      this.afterLogin(formData);
    } catch (error) {
      const errmessage = (error as ErrorResponse).message;
      showToast({
        text: `${errmessage}`,
        type: 'negative',
      });
    }
  }

  public async afterLogin(data: RegistrationFormData) {
    try {
      await this.appModel.postLoginCustomer(data.email, data.password);
      showToast({
        text: 'Successfully logged in! Redirecting...',
        type: 'positive',
      });
      setTimeout(() => {
        this.routerController.goToPage('/');
      }, 2000);
      this.handleVisiblityButtons();
    } catch (error) {
      const errmessage = (error as ErrorResponse).message;
      showToast({
        text: `${errmessage}`,
        type: 'negative',
      });
    }
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

  public handleClickRegistrationButton() {
    this.routerController.goToPage('/registration');
  }

  public handleClickLogoutButton() {
    this.routerController.goToPage('/');
    localStorage.removeItem('true-key');
    this.handleVisiblityButtons();
  }

  public handleVisiblityButtons() {
    const isLogin = !!localStorage.getItem('true-key');
    console.log(isLogin);
    this.appView.toglleButtonsVisiblity(isLogin);
  }

  public handleClickGoHomeButton() {
    this.routerController.goToPage('/');
  }
}