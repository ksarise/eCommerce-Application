import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';
// eslint-disable-next-line import/no-absolute-path
import animation from '/NotFoundAnimation.json?url';
import './404.scss';

export default class NotFoundView {
  private notFound: BaseComponentGenerator;

  public handleClickGoHomeButton: ((event?: Event) => void) | undefined;

  constructor() {
    this.notFound = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['not-found'],
    });
  }

  public getContent(): HTMLElement {
    return this.notFound.getElement();
  }

  public create() {
    this.createNotFound();
  }

  public createNotFound(): void {
    const notFoundContainer = tags.div(['not-found__animation'], '', {});
    notFoundContainer.innerHTML = `<lottie-player src="${animation}" background="transparent"  speed="1"  style="width: 600px; height: 600px;" loop autoplay></lottie-player>`;
    const buttonGoHome = tags.button(
      ['not-found__button'],
      'Go Home',
      {},
      'click',
      this.handleClickGoHomeButton,
    );
    this.notFound.appendChild(notFoundContainer);
    this.notFound.appendChild(buttonGoHome);
  }
}
