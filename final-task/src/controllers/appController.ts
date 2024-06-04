import {
  type ErrorResponse,
  type Product,
  ClientResponse,
} from '@commercetools/platform-sdk';
import AppView from '../views/appView';
import AppModel from '../models/appModel';
import routerController from '../services/router';
import RegistrationController from './Registration/RegistrationController';
import ProfileController from './profile/ProfileController';
import showToast from '../services/ToastMessages';
import { RegistrationFormData } from '../global/interfaces/registration';
import MainController from './Main/MainController';

export default class AppController {
  public appView: AppView;

  public appModel: AppModel;

  private routerController = routerController;

  private mainController: MainController;

  private registrationController: RegistrationController;

  private profileController: ProfileController;

  constructor() {
    this.appView = new AppView();
    this.appModel = new AppModel();
    this.registrationController = new RegistrationController(
      this.appView.registrationView,
      this.appModel.registrationModel,
    );
    this.mainController = new MainController(
      this.appModel.mainModel,
      this.appView.mainView,
    );
    this.profileController = new ProfileController(
      this.appView.profileView,
      this.appModel,
    );
  }

  public async initialize() {
    await this.initializeListeners();
    await this.initializeLoginListeners();
    await this.appView.create();
    await this.registrationController.init();
    await this.profileController.init();
    if (localStorage.getItem('userCreds')) await this.getUser();
    document.querySelector<HTMLDivElement>('.body')!.innerHTML =
      this.appView.innerHTML;
    await this.fetchAndLogProducts();
    await this.fetchCategories();
    this.mainController.initialize();
    routerController.handleLocation();
    this.handleVisiblityButtons();
  }

  public initializeListeners() {
    this.routerController.changeContent = this.changeContent.bind(this);
    this.routerController.fecthProductById = this.fecthProductById.bind(this);
    this.appView.headerView.handleClickLoginButton =
      this.handleClickLoginButton.bind(this);
    this.appView.headerView.handleClickRegistrationButton =
      this.handleClickRegistrationButton.bind(this);
    this.appView.headerView.handleClickLogoutButton =
      this.handleClickLogoutButton.bind(this);
    this.appView.headerView.handleClickMyProfile =
      this.handleClickProfileButton.bind(this);
    this.appView.notFoundView.handleClickGoHomeButton =
      this.handleClickGoHomeButton.bind(this);
    this.appView.registrationView.bindFormSubmit(
      this.handleRegistrationFormSubmit.bind(this),
    );
    this.appView.mainView.bindApplyFilters(this.handleApplyFilters.bind(this));
    this.appView.mainView.bindResetFilters(this.handleResetFilters.bind(this));
    this.appView.mainView.bindSortDropdown(this.handleSortChange.bind(this));
    this.appView.mainView.bindTextSearch(this.handleSearch.bind(this));
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
        loginViewVariables.addListenerToLogin();
        this.routerController.goToPage('/');
        this.handleVisiblityButtons();
      } else {
        showToast({
          text: `${result.obj}`,
          type: 'negative',
        });
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
    this.appModel.logout();
    this.routerController.goToPage('/');
    localStorage.removeItem('userCreds');
    this.handleVisiblityButtons();
  }

  public async handleClickProfileButton() {
    await this.routerController.goToPage('/my_profile');
    await this.getUser();
  }

  public async getUser() {
    try {
      const { body } = await this.appModel.getCustomerProfile();
      this.profileController.updateData(body);
    } catch (error) {
      console.log('create user');
    }
  }

  public handleVisiblityButtons() {
    this.appView.headerView.toggleButtonVisibility(this.appModel.isLogined);
  }

  public handleClickGoHomeButton() {
    this.routerController.goToPage('/');
  }

  public async fetchAndLogProducts(
    filters?: string[],
    sorts?: string,
    texts?: string,
  ) {
    try {
      console.log('fetch filters', filters);
      if (filters) {
        const products = await this.appModel.requestGetProducts(
          filters,
          sorts,
          texts,
        );
        this.appModel.mainModel.setProducts(products);
        this.mainController.renderProducts();
      } else {
        const products = await this.appModel.requestGetProducts();
        this.appModel.mainModel.setProducts(products);
      }
    } catch (error) {
      const errmessage = (error as ErrorResponse).message;
      showToast({
        text: `Fetch Products error${errmessage}`,
        type: 'negative',
      });
    }
  }

  public async handleClickProduct(event: Event) {
    const { id } = (event.target! as HTMLElement).dataset;
    if (!id) {
      showToast({
        text: 'No product id',
        type: 'negative',
      });
      return;
    }
    this.fecthProductById(id);
  }

  public async fecthProductById(id: string) {
    let response: ClientResponse<Product> | null = null;
    try {
      response = await this.appModel.getProductById(id);
    } catch (error) {
      const status = (error as ErrorResponse).statusCode;
      if (status === 404) {
        this.changeContent?.('404');
        return;
      }
      const errmessage = (error as ErrorResponse).message;
      showToast({
        text: `Error: ${errmessage}`,
        type: 'negative',
      });
    }
    if (response) {
      this.appView.productPageView.render(response.body);
    }
  }

  private async handleApplyFilters() {
    const { searchQuery } = this.appModel.mainModel;
    await this.fetchAndLogProducts(
      searchQuery,
      this.appModel.mainModel.sort,
      this.appModel.mainModel.textSearch,
    );
  }

  private async handleResetFilters() {
    await this.fetchAndLogProducts();
    this.mainController.handleResetFilters();
  }

  private async handleSortChange(value: string) {
    if (value !== this.appModel.mainModel.sort) {
      this.appModel.mainModel.handleSort(value);
      await this.fetchAndLogProducts(
        this.appModel.mainModel.searchQuery || [],
        this.appModel.mainModel.sort,
        this.appModel.mainModel.textSearch,
      );
      this.mainController.renderProducts();
    }
  }

  private async handleSearch(value: string) {
    this.appModel.mainModel.handleSearch(value);
    await this.fetchAndLogProducts([], this.appModel.mainModel.sort, value);
    this.mainController.renderProducts();
  }

  public async fetchCategories() {
    try {
      const categories = await this.appModel.requestGetCategories();
      this.appModel.mainModel.setCategories(categories);
    } catch (error) {
      const errmessage = (error as ErrorResponse).message;
      showToast({
        text: `${errmessage}`,
        type: 'negative',
      });
    }
  }
}
