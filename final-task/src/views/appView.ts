import MainView from './main';
import LoginView from './login';
import registrationView from './registration';
import HeaderView from './header/header';
import NotFoundView from './404/404';

const appViewHeader = `
  <div class="navigation">
    <a href="/" class="navigation__link" data-navigo>
      Main
    </a>
    <a href="/login" class="navigation__link" data-navigo>
      Login
    </a>
    <a href="/registration" class="navigation__link" data-navigo>
      Registration
    </a>
    <button class="customers">Get Customers</button>
  </div>
  <div id="content" class="view"></div>
`;

export default class AppView {
  public innerHTML: string;

  public mainView: MainView;

  public loginView: LoginView;

  public registrationView: string;

  public headerView: HeaderView;

  public notFoundView: NotFoundView;

  public constructor() {
    this.loginView = new LoginView();
    this.innerHTML = appViewHeader;
    this.headerView = new HeaderView();
    this.mainView = new MainView();
    this.notFoundView = new NotFoundView();
    this.registrationView = registrationView;
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
        content!.innerHTML = this.registrationView;
        this.loginView.addClassToLogin(false);
        break;
      case '404':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.notFoundView.getContent());
        this.loginView.addClassToLogin(false);
        break;
      default:
        console.log('Page not found');
    }
  }
}
