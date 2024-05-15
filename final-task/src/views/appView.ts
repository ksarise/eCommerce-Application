import mainView from './main';
import LoginView from './login';
import registrationView from './registration';

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
  <div id="content" class="view"></div>
`;

export default class AppView {
  public innerHTML: string = appViewHeader;

  public mainView: string = mainView;

  public loginView: LoginView = new LoginView();

  public registrationView: string = registrationView;

  public renderContent(page: string) {
    const content = document.getElementById('content');
    switch (page) {
      case 'main':
        content!.innerHTML = this.mainView;
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
      default:
        console.log('Page not found');
    }
  }
}
