import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';

export default class HeaderView {
  private header: BaseComponentGenerator;

  private logoContainer: HTMLDivElement;

  private linkContainer: HTMLDivElement;

  public buttonContainer: HTMLDivElement;

  public handleClickLoginButton: ((event?: Event) => void) | undefined;

  public handleClickRegistrationButton: ((event?: Event) => void) | undefined;

  public handleClickLogoutButton: ((event?: Event) => void) | undefined;

  public handleClickMyProfile: (() => void) | undefined;

  public handleClickCartButton: (() => void) | undefined;

  public handleClickAboutUsButton: (() => void) | undefined;

  constructor() {
    this.header = new BaseComponentGenerator({
      tag: 'header',
      classNames: ['header', 'container'],
    });
    this.logoContainer = tags
      .div(['header__logo-container'], '', {})
      .getElement() as HTMLDivElement;
    this.linkContainer = tags
      .div(['header__navigation'], '', {})
      .getElement() as HTMLDivElement;
    this.buttonContainer = tags
      .div(['header__buttons'], '', {})
      .getElement() as HTMLDivElement;
    this.addListenerScroll();
  }

  public getContent(): HTMLElement {
    return this.header.getElement();
  }

  public create() {
    this.createHeader();
  }

  public createHeader(): void {
    const linkHome = tags.a(['header__logo-container_link'], '/', '', {
      title: 'Link',
      'data-navigo': 'true',
    });
    linkHome.innerHTML = `<svg class="color-logo" version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="40.000000pt" height="40.000000pt" viewBox="0 0 115.000000 134.000000"
    preserveAspectRatio="xMidYMid meet">
   
   <g transform="translate(0.000000,134.000000) scale(0.100000,-0.100000)"
   fill="#000000" stroke="#ffffff" stroke-width="40">
   <path d="M10 1190 l0 -140 95 0 95 0 0 45 0 45 475 0 475 0 0 95 0 95 -570 0
   -570 0 0 -140z"/>
   <path d="M10 475 l0 -475 95 0 95 0 0 380 0 380 475 0 475 0 0 95 0 95 -570 0
   -570 0 0 -475z"/>
   <path d="M390 330 l0 -330 95 0 95 0 0 185 0 185 285 0 285 0 0 95 0 95 -285
   0 -285 0 0 50 0 50 -95 0 -95 0 0 -330z"/>
   </g>
   </svg>`;
    this.logoContainer.appendChild(linkHome);
    this.header.appendChild(this.logoContainer);
    this.header.appendChild(this.createLinkNavigation());
    this.header.appendChild(this.createbuttonNavigation());
  }

  private createLinkNavigation(): HTMLDivElement {
    const linkHome = tags.a(
      ['header__navigation_link', 'header__navigation_login'],
      '/',
      'Home',
      {
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    const linkCatalog = tags.a(
      ['header__navigation_link', 'header__navigation_login'],
      '/catalog',
      'Catalog',
      {
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    const linkRegistration = tags.a(
      ['header__navigation_link', 'header__navigation_register'],
      '/registration',
      'Registration',
      {
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    this.linkContainer.append(linkHome, linkCatalog, linkRegistration);
    return this.linkContainer;
  }

  private createbuttonNavigation(): HTMLDivElement {
    const buttonLogin = tags.button(
      ['header__button', 'header__button_login'],
      '',
      { title: 'Login' },
      'click',
      this.handleClickLoginButton,
    );
    const imgLogin = tags.div(['img_login']).getElement();
    buttonLogin.appendChild(imgLogin);
    const buttonRegistration = tags.button(
      ['header__button', 'header__button_registration'],
      '',
      { title: 'Register' },
      'click',
      this.handleClickRegistrationButton,
    );
    const imgRegistration = tags.div(['img_registration']).getElement();
    buttonRegistration.appendChild(imgRegistration);
    const buttonLogout = tags.button(
      ['header__button', 'header__button_login'],
      '',
      { title: 'Logout' },
      'click',
      this.handleClickLogoutButton,
    );
    const imgLogout = tags.div(['img_logout']).getElement();
    buttonLogout.appendChild(imgLogout);
    const buttonMyProfile = tags.button(
      ['header__button', 'header__button_profile'],
      '',
      { title: 'Profile' },
    );
    const imgAbout = tags.div(['img_about']).getElement();
    const buttonAboutUs = tags.button(
      ['header__button', 'header__button_about-us'],
      '',
      { title: 'About Us' },
      'click',
      this.handleClickAboutUsButton,
    );
    buttonAboutUs.append(imgAbout);
    const imgCart = tags.div(['img_cart']).getElement();
    const buttonCartBlock = tags
      .div(['header__button', 'header__button_cart'], '', {
        title: 'Cart',
      })
      .getElement() as HTMLDivElement;
    const buttonCartQuantity = tags.span(['header__button_cart_quantity'], '0');
    buttonCartBlock.append(imgCart, buttonCartQuantity);
    buttonCartBlock.addEventListener('click', () => {
      this.handleClickCartButton!();
    });

    buttonMyProfile.addEventListener('click', async () => {
      if (this.handleClickMyProfile) await this.handleClickMyProfile();
    });
    const imgProfile = tags.div(['img_profile']).getElement();
    buttonMyProfile.prepend(imgProfile);
    this.buttonContainer.append(
      buttonAboutUs,
      buttonCartBlock,
      buttonLogin,
      buttonRegistration,
      buttonMyProfile,
      buttonLogout,
    );
    return this.buttonContainer;
  }

  public toggleButtonVisibility(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.buttonContainer.classList.add('loginned');
      this.linkContainer.classList.add('loginned');
    } else {
      this.linkContainer.classList.remove('loginned');
      this.buttonContainer.classList.remove('loginned');
    }
  }

  private addListenerScroll(): void {
    let lastScrollTop: number = 0;
    window.addEventListener(
      'scroll',
      () => {
        const position = window.scrollY;
        if (position > lastScrollTop) {
          if (
            position >
              window.screen.height - this.header.getElement().clientHeight &&
            document.querySelector('.home')
          ) {
            this.header.getElement().classList.toggle('header__home', false);
            this.header.getElement().classList.toggle('header__scroll', true);
          }
          if (!document.querySelector('.home')) {
            this.header.getElement().classList.toggle('header__scroll', false);
          }
        } else if (position < lastScrollTop) {
          if (
            position <
              window.screen.height - this.header.getElement().clientHeight &&
            document.querySelector('.home')
          ) {
            this.header.getElement().classList.toggle('header__home', true);
            this.header.getElement().classList.toggle('header__scroll', false);
          }
          if (!document.querySelector('.home')) {
            this.header.getElement().classList.toggle('header__scroll', true);
          }
        }
        lastScrollTop = position <= 0 ? 0 : position;
      },
      false,
    );
  }

  public updateCartCount(value: number): void {
    const buttonCart = this.buttonContainer.querySelector(
      '.header__button_cart',
    ) as HTMLDivElement;
    const buttonCartQuantity = buttonCart.querySelector(
      '.header__button_cart_quantity',
    ) as HTMLSpanElement;
    if (buttonCartQuantity) {
      if (value !== 0) {
        buttonCartQuantity.classList.remove(
          'header__button_cart_quantity-hidden',
        );
        buttonCartQuantity.innerHTML = value.toString();
      } else {
        buttonCartQuantity.classList.add('header__button_cart_quantity-hidden');
      }
    }
  }
}
