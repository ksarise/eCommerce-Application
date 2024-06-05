import Navigo from 'navigo';

class Router {
  public router: Navigo;

  public root: string = '/';

  public changeContent: ((page: string) => void) | undefined;

  public fecthProductById: ((id: string) => void) | undefined;

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
      if (localStorage.getItem('userCreds')) {
        this.goToPage('/');
      } else {
        this.changeContent?.('login');
      }
      this.router.resolve();
    });

    this.router.on('/registration', () => {
      if (localStorage.getItem('userCreds')) {
        this.goToPage('/');
      } else {
        this.changeContent?.('registration');
      }
      this.router.resolve();
    });

    this.router.on('/product/:productId', () => {
      this.changeContent?.('product');
      this.router.resolve();
    });

    this.router.on('/my_profile', () => {
      if (!localStorage.getItem('userCreds')) {
        this.goToPage('/');
      } else {
        this.changeContent?.('my_profile');
      }
      this.router.resolve();
    });

    this.router.notFound(() => {
      this.changeContent?.('404');
      this.router.resolve();
    });
  }

  public goToPage(page: string) {
    this.router.navigate(page);
  }

  public handleLocation() {
    const path = window.location.pathname;
    if (path.includes('product')) {
      this.fecthProductById?.(path.split('/product/')[1]);
    }
    this.goToPage(path);
  }
}

const routerController = new Router();
export default routerController;
