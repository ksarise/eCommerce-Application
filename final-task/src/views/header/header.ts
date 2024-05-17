import './header.scss';
import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';

export default class HeaderView {
  private header: BaseComponentGenerator;

  private logoContainer: HTMLDivElement;

  private linkContainer: HTMLDivElement;

  private buttonContainer: HTMLDivElement;

  public handleClickLoginButton: ((event?: Event) => void) | undefined;

  constructor() {
    this.header = new BaseComponentGenerator({
      tag: 'header',
      classNames: ['header', 'container'],
    });
    this.logoContainer = tags.div(['header__logo-container'], '', {});
    this.linkContainer = tags.div(['header__navigation'], '', {});
    this.buttonContainer = tags.div(['header__buttons'], '', {});
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
    linkHome.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="40.000000pt" height="40.000000pt" viewBox="0 0 115.000000 134.000000"
    preserveAspectRatio="xMidYMid meet">
   
   <g transform="translate(0.000000,134.000000) scale(0.100000,-0.100000)"
   fill="#000000" stroke="none">
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
    const linkRegistration = tags.a(
      ['header__navigation_link', 'header__navigation_register'],
      '/registration',
      'Registration',
      {
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    // -----Next are the non-working links to see the UI
    const linkCatalog = tags.a(
      ['header__navigation_link', 'header__navigation_catalog'],
      '/catalog',
      'Catalog',
      {
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    const linkAbout = tags.a(
      ['header__navigation_link', 'header__navigation_about'],
      '/about',
      'About',
      {
        title: 'Link',
        'data-navigo': 'true',
      },
    );
    // -----
    this.linkContainer.appendChild(linkHome);
    this.linkContainer.appendChild(linkCatalog);
    this.linkContainer.appendChild(linkAbout);
    this.linkContainer.appendChild(linkRegistration);
    return this.linkContainer;
  }

  private createbuttonNavigation(): HTMLDivElement {
    const buttonCustomers = tags.button(
      ['header__button', 'header__button_login'],
      'Login',
      {},
      'click',
      this.handleClickLoginButton,
    );
    this.buttonContainer.appendChild(buttonCustomers);
    return this.buttonContainer;
  }
}
