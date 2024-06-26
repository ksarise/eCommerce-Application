import MainView from './Main/MainView';
import LoginView from './login';
import RegistrationView from './Registration/RegistrationView';
import HeaderView from './header/header';
import NotFoundView from './404/404';
import ProductPageView from './ProductPage/ProductPageView';
import Profile from './myProfile/myProfileView';
import AboutView from './AboutUs/aboutUsView';
import CartView from './Cart/CartView';
import HomeView from './Home/HomeView';
import FooterView from './footer/footerView';

const appViewHeader = `<div id="content" class="view container"></div>`;

export default class AppView {
  public innerHTML: string;

  public mainView: MainView;

  public loginView: LoginView;

  public registrationView: RegistrationView;

  public headerView: HeaderView;

  public notFoundView: NotFoundView;

  public productPageView: ProductPageView;

  public profileView: Profile;

  public aboutView: AboutView;

  public cartView: CartView;

  public homeView: HomeView;

  public footerView: FooterView;

  public constructor() {
    this.loginView = new LoginView();
    this.innerHTML = appViewHeader;
    this.headerView = new HeaderView();
    this.homeView = new HomeView();
    this.mainView = new MainView();
    this.notFoundView = new NotFoundView();
    this.registrationView = new RegistrationView();
    this.productPageView = new ProductPageView();
    this.profileView = new Profile();
    this.aboutView = new AboutView();
    this.cartView = new CartView();
    this.footerView = new FooterView();
  }

  public create() {
    this.headerView.create();
    this.notFoundView.create();
    this.productPageView.create();
    this.cartView.create();
  }

  public renderContent(page: string) {
    document.querySelector('.body')!.prepend(this.headerView.getContent());
    const content = document.getElementById('content');
    switch (page) {
      case 'home':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.homeView.getContent());
        this.loginView.addClassToLogin(false);
        break;
      case 'main':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.mainView.getContent());
        globalThis.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        this.loginView.addClassToLogin(false);
        break;
      case 'login':
        content!.innerHTML = '';
        content!.append(this.loginView.createLogin());
        this.loginView.addClassToLogin(true);
        break;
      case 'registration':
        content!.innerHTML = '';
        content!.append(this.registrationView.RenderPage());
        this.loginView.addClassToLogin(false);
        break;
      case 'my_profile':
        content!.innerHTML = '';
        content!.append(this.profileView.createProfile());
        this.loginView.addClassToLogin(false);
        break;
      case 'about_us':
        content!.innerHTML = '';
        content!.append(this.aboutView.createAboutUs());
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
      case 'product':
        document.getElementById('content')!.innerHTML = '';
        document
          .getElementById('content')!
          .appendChild(this.productPageView.getContent());
        this.loginView.addClassToLogin(false);
        break;
      case 'cart':
        document.getElementById('content')!.innerHTML = '';
        console.log(this.cartView.myCartContainer.getContent());
        document
          .getElementById('content')!
          .appendChild(this.cartView.getContent());
        this.loginView.addClassToLogin(false);
        break;
      default:
        console.log('Page not found');
    }
    document.querySelector('.body')!.append(this.footerView.getContent());
  }
}
