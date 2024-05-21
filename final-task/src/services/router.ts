import Navigo from 'navigo';

class Router {
  public router: Navigo;

  public root: string = '/';

  public isLogined: boolean | undefined;

  public changeContent: ((page: string) => void) | undefined;

  constructor() {
    this.router = new Navigo(this.root);
    this.routerListeners();
  }

  public routerListeners() {
    this.router.on('/', () => {
      this.changeContent?.('main');
      this.router.resolve();
    });

    this.router.on('/login', () => {
      if (this.isLogined) {
        this.goToPage('/');
      } else {
        this.changeContent?.('login');
      }
      this.router.resolve();
    });

    this.router.on('/registration', () => {
      if (this.isLogined) {
        this.goToPage('/');
      } else {
        this.changeContent?.('registration');
      }
      this.router.resolve();
    });

    this.router.notFound(() => {
      this.changeContent?.('404');
      this.router.resolve();
    });
  }

  public goToPage(page: string, isLogined?: boolean) {
    if (isLogined) {
      this.isLogined = isLogined;
    }
    this.router.navigate(page);
  }

  public handleLocation() {
    const path = window.location.pathname;
    this.goToPage(path);
  }
}

const routerController = new Router();
export default routerController;
