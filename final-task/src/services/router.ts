import Navigo from 'navigo';

class Router {
  public router: Navigo;

  public root: string = '/';

  public changeContent: ((page: string) => void) | undefined;

  public fecthProductById: ((id: string) => void) | undefined;

  public fetchProductsByCategory:
    | ((pathSegments: string[]) => void)
    | undefined;

  public fetchProductsFromCart: (() => void) | undefined;

  constructor() {
    this.router = new Navigo(this.root);
    this.routerListeners();
  }

  public routerListeners() {
    this.router.on('/', () => {
      this.changeContent?.('home');
      this.router.resolve();
    });
    this.router.on('/catalog', () => {
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

    this.router.on('/product/:productId', (data) => {
      this.fecthProductById?.(data!.data!.productId);
      this.changeContent?.('product');
      this.router.resolve();
    });

    this.router.on('/about_us', () => {
      this.changeContent?.('about_us');
      this.router.resolve();
    });

    this.router.on('/my_profile', () => {
      if (!localStorage.getItem('userCreds')) {
        this.goToPage('/login');
      } else {
        this.changeContent?.('my_profile');
      }
      this.router.resolve();
    });

    this.router.on('/cart', () => {
      this.changeContent?.('cart');
      this.router.resolve();
    });

    this.router.notFound(() => {
      this.changeContent?.('404');
      this.router.resolve();
    });
  }

  public goToPage(page: string) {
    this.router.navigate(page);
    if (page.includes('product')) {
      this.fecthProductById?.(page.split('/product/')[1]);
    }
  }

  public handleLocation() {
    const path = window.location.pathname;
    if (path.includes('product')) {
      this.goToPage(path);
      // this.fecthProductById?.(path.split('/product/')[1]);
    } else if (path.includes('categories')) {
      this.fetchProductsByCategory?.(
        path.split('/').filter((segment) => segment),
      );
    } else if (path.includes('cart')) {
      this.fetchProductsFromCart?.();
    }
    this.goToPage(path);
  }
}

const routerController = new Router();
export default routerController;
