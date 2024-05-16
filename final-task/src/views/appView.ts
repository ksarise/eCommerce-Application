import MainView from './main';
import loginView from './login';
import registrationView from './registration';
import HeaderView from './header/header';

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
    <div id="content" class="view"></div>
  </div>
`;

export default class AppView {
  public innerHTML: string = appViewHeader;

  public mainView: MainView;

  public loginView: string = loginView;

  public registrationView: string = registrationView;

  public headerView: HeaderView;

  public constructor() {
    this.headerView = new HeaderView();
    this.mainView = new MainView();
  }

  public create() {
    this.headerView.create();
  }

  public renderContent(page: string) {
    document.querySelector('.body')!.prepend(this.headerView.getContent());
    switch (page) {
      case 'main':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.mainView.getContent());
        break;
      case 'login':
        document.getElementById('content')!.innerHTML = this.loginView;
        break;
      case 'registration':
        document.getElementById('content')!.innerHTML = this.registrationView;
        break;
      default:
        console.log('Page not found');
    }
  }
}
