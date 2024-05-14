import MainView from './main';
import LoginView from './login';
import RegistrationPageView from './RegistrationPage/RegistrationPageView';
import HeaderView from './header/header';
import NotFoundView from './404/404';

const appViewHeader = `<div id="content" class="view container"></div>`;

export default class AppView {
  public innerHTML: string;

  public mainView: MainView;

  public loginView: LoginView;

  public registrationView: HTMLElement;

  public headerView: HeaderView;

  public notFoundView: NotFoundView;

  public constructor() {
    this.loginView = new LoginView();
    this.innerHTML = appViewHeader;
    this.headerView = new HeaderView();
    this.mainView = new MainView();
    this.notFoundView = new NotFoundView();
    this.registrationView = new RegistrationPageView().RenderPage();
  }

  public create() {
    this.headerView.create();
    this.notFoundView.create();
  }

  public renderContent(page: string) {
    document.querySelector('.body')!.prepend(this.headerView.getContent());
    const content = document.getElementById('content');
    switch (page) {
      case 'main':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.mainView.getContent());
        this.loginView.addClassToLogin(false);
        break;
      case 'login':
        content!.innerHTML = '';
        content!.append(this.loginView.createLogin() as HTMLElement);
        this.loginView.addClassToLogin(true);
        break;
      case 'registration':
        content!.innerHTML = '';
        content!.append(this.registrationView as HTMLElement);
        this.loginView.addClassToLogin(false);
        break;
      case '404':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.notFoundView.getContent());
        this.notFoundView.assignAnimation();
        this.loginView.addClassToLogin(false);
        break;
      default:
        console.log('Page not found');
    }
  }
}
