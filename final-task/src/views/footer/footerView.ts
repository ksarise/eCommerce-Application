import tags from '../../tags/tags';

export default class FooterView {
  private footer: HTMLElement;

  constructor() {
    this.footer = tags.div(['footer']).getElement();
    this.createFooterBlock();
  }

  getContent() {
    return this.footer;
  }

  private createFooterBlock() {
    this.createHeading();
    this.createFollowUs();
    this.createContactUs();
    this.createInformation();
    this.createPayment();
    // this.createMembership();
  }

  private createHeading() {
    const heading = tags.h1(['footer__h1'], 'Frost glide');
    this.footer.append(heading);
  }

  private createFollowUs() {
    const blockFollowUs = tags
      .div(['footer__block'], '', { id: 'follow-us' })
      .getElement();
    const heading = tags.h2(['footer__h2'], 'Follow Us');
    const list = tags.div(['footer__list']).getElement();
    const listItems = [
      'footer__facebook',
      'footer__instagram',
      'footer__twitter',
    ];
    listItems.forEach((item) => {
      const listItem = tags.div(['footer__svg', item]).getElement();
      list.append(listItem);
    });
    blockFollowUs.append(heading, list);
    this.footer.append(blockFollowUs);
  }

  private createContactUs() {
    const blockContactUs = tags
      .div(['footer__block'], '', { id: 'contact-us' })
      .getElement();
    const heading = tags.h2(['footer__h2'], 'Contact Us');
    const list = tags.div(['footer__list']).getElement();
    const listItems = [
      {
        class: 'footer__phone',
        text: '+1 800 123 4567',
        href: 'tel:+1 800 123 4567',
      },
      {
        class: 'footer__email',
        text: 'flostglide@gmail.com',
        href: 'flostglide@gmail.com',
      },
      {
        class: 'footer__address',
        text: '123 Main Street, New York, NY 10001',
        href: '123 Main Street, New York, NY 10001',
      },
    ];
    listItems.forEach((item) => {
      const listItem = tags.a(['footer__list-item'], item.href);

      const svg = tags.div(['footer__svg', item.class]).getElement();
      const text = tags.div(['footer__text'], item.text).getElement();
      listItem.append(svg, text);
      list.append(listItem);
    });
    blockContactUs.append(heading, list);
    this.footer.append(blockContactUs);
  }

  private createInformation() {
    const blockInformation = tags.div(['footer__block']).getElement();
    const heading = tags.h2(['footer__h2'], 'Information');
    const list = tags.div(['footer__list']).getElement();
    const listItems = [
      {
        class: 'footer__link',
        text: 'About Us',
        data: '/about_us',
      },
      {
        class: 'footer__link',
        text: 'Catalog',
        data: '/catalog',
      },
      {
        class: 'footer__link',
        text: 'Home',
        data: '/home',
      },
      {
        class: 'footer__link',
        text: 'Cart',
        data: '/cart',
      },
      {
        class: 'footer__link',
        text: 'Contact Us',
        data: '#contact-us',
      },
      {
        class: 'footer__link',
        text: 'Follow Us',
        data: '#follow-us',
      },
      {
        class: 'footer__link',
        text: 'Payment',
        data: '#payment',
      },
    ];
    listItems.forEach((item) => {
      const listItem = tags.a(
        ['footer__list-item', item.class],
        item.data,
        item.text,
      );
      list.append(listItem);
    });
    blockInformation.append(heading, list);
    this.footer.append(blockInformation);
  }

  private createPayment() {
    const blockPayment = tags
      .div(['footer__block'], '', { id: 'payment' })
      .getElement();
    const heading = tags.h2(['footer__h2'], 'Payment');
    const list = tags.div(['footer__list']).getElement();
    const listItems = ['footer__visa', 'footer__mastercard', 'footer__paypal'];
    listItems.forEach((item) => {
      const listItem = tags.div(['footer__svg', item]).getElement();
      list.append(listItem);
    });
    blockPayment.append(heading, list);
    this.footer.append(blockPayment);
  }
}
