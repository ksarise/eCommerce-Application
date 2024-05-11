import AppView from '../views/appView';
import routerController from '../services/router';

export default class Controller {
  public appView: AppView;

  private routerController = routerController;

  constructor() {
    this.appView = new AppView();
  }

  public initialize() {
    document.querySelector<HTMLDivElement>('.body')!.innerHTML =
      this.appView.innerHTML;
    this.initializeListeners();
    routerController.handleLocation();
  }

  public initializeListeners() {
    const navLinks = document.querySelectorAll('.navigation__link');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = link.getAttribute('href');
        if (path) {
          this.changePage(path);
        }
      });
    });
    this.routerController.changeContent = this.changeContent.bind(this);
  }

  public changePage(path: string) {
    this.routerController.goToPage(path);
  }

  public changeContent(page: string) {
    this.appView.renderContent(page);
  }
}
