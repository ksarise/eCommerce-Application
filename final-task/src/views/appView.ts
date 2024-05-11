import mainView from './main';
import loginView from './login';
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
    <div id="content" class="view"></div>
  </div>
`;

export default class AppView {
  public innerHTML: string = appViewHeader;

  public mainView: string = mainView;

  public loginView: string = loginView;

  public registrationView: string = registrationView;

  public renderContent(page: string) {
    switch (page) {
      case 'main':
        document.getElementById('content')!.innerHTML = this.mainView;
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
