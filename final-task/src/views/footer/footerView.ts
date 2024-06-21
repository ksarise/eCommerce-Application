import tags from '../../tags/tags';

export default class FooterView {
  private footer: HTMLElement;

  private contactUs: HTMLElement;

  private mainContent: HTMLElement;

  private command: HTMLElement;

  constructor() {
    this.footer = tags.div(['footer']).getElement();
    this.contactUs = tags.div(['footer__content']).getElement();
    this.mainContent = tags.div(['footer__content']).getElement();
    this.command = tags
      .div(['footer__content', 'footer__command'])
      .getElement();
    this.footer.append(this.mainContent, this.contactUs, this.command);
    this.createFooterBlock();
  }

  getContent() {
    return this.footer;
  }

  private createFooterBlock() {
    this.createHeading();
    this.createInformation();
    this.createFollowUs();
    this.createContactUs();
    this.createPayment();
    this.createEndFooter();
    this.createTeam();
    this.createEmailBlock();
  }

  private createHeading() {
    const frostGlideSvg = tags.div(['footer__rost-glide']).getElement();
    const heading = tags.h1(['footer__h1'], 'rost glide');
    heading.prepend(frostGlideSvg);
    this.mainContent.append(heading);
  }

  private createFollowUs() {
    const blockFollowUs = tags
      .div(['footer__block'], '', { id: 'follow-us' })
      .getElement();
    const heading = tags.h2(['footer__h2'], 'Follow Us');
    const list = tags.div(['footer__list', 'footer__follow']).getElement();
    const listItems = [
      {
        class: 'footer__facebook',
        href: 'https://www.facebook.com/',
      },
      {
        class: 'footer__instagram',
        href: 'https://www.instagram.com/',
      },
      {
        class: 'footer__twitter',
        href: 'https://twitter.com/',
      },
    ];
    listItems.forEach((item) => {
      const listItem = tags.a(['footer__svg', item.class], item.href, '', {
        target: '_blank',
      });
      list.append(listItem);
    });
    blockFollowUs.append(heading, list);
    this.contactUs.append(blockFollowUs);
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
    this.contactUs.append(blockContactUs);
  }

  private createInformation() {
    const blockInformation = tags.div(['footer__block']).getElement();
    const heading = tags.h2(['footer__h2'], 'Information');
    const list = tags.div(['footer__list']).getElement();
    const listItems = [
      {
        class: 'footer__contact',
        text: 'About Us',
        data: '/about_us',
      },
      {
        class: 'footer__contact',
        text: 'Catalog',
        data: '/catalog',
      },
      {
        class: 'footer__contact',
        text: 'Home',
        data: '/',
      },
      {
        class: 'footer__contact',
        text: 'Cart',
        data: '/cart',
      },
      {
        class: 'footer__contact',
        text: 'Contact Us',
        data: '#contact-us',
      },
      {
        class: 'footer__contact',
        text: 'Follow Us',
        data: '#follow-us',
      },
      {
        class: 'footer__contact',
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
    this.mainContent.append(blockInformation);
  }

  private createPayment() {
    const blockPayment = tags
      .div(['footer__block'], '', { id: 'payment' })
      .getElement();
    const heading = tags.h2(['footer__h2'], 'Payment');
    const list = tags
      .div(['footer__list', 'footer__payment-items'])
      .getElement();
    const listItems = ['footer__visa', 'footer__mastercard', 'footer__paypal'];
    listItems.forEach((item) => {
      const listItem = tags.div(['footer__payment', item]).getElement();
      list.append(listItem);
    });
    blockPayment.append(heading, list);
    this.command.append(blockPayment);
  }

  private createEndFooter() {
    const endFooter = tags.div(['footer__end']).getElement();
    const text = tags.div(['footer__end-link'], '© 2024').getElement();
    const link = tags.a(['footer__end-link'], '/', 'Frost glide');
    endFooter.append(link, text);
    this.footer.append(endFooter);
  }

  private createTeam() {
    const blockTeam = tags.div(['footer__block']).getElement();
    const heading = tags.h2(['footer__h2'], 'Our Team');
    const list = tags.div(['footer__list']).getElement();
    const listItems = [
      {
        github: 'https://github.com/ksarise',
        name: 'Sergey',
      },
      {
        github: 'https://github.com/kitakiv',
        name: 'Victoria',
      },
      {
        github: 'https://github.com/andrey257686',
        name: 'Andrey',
      },
    ];
    listItems.forEach((item) => {
      const link = tags.a(['footer__list-item'], item.github);
      const listItem = tags.div(['footer__text'], item.name).getElement();
      const svg = tags.div(['footer__svg', 'footer__github']).getElement();
      link.append(svg, listItem);
      list.append(link);
    });
    blockTeam.append(heading, list);
    this.command.append(blockTeam);
  }

  private createEmailBlock() {
    const heading = tags.h2(['footer__h2'], 'Write your feedback');
    const form = tags.form(['footer__form'], { type: 'submit' });
    const input = tags.input(['footer__input', 'input'], {
      type: 'text',
      placeholder: 'Feedback',
    });
    this.contactUs.append(form);
    const label = tags.label(['footer__label', 'label'], 'Feedback');
    const button = tags.button(['footer__button'], 'Submit', {
      type: 'submit',
    });
    form.append(heading, label, input, button);
    this.contactUs.append(form);
  }
}
