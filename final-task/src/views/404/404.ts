import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';
// eslint-disable-next-line import/no-absolute-path
import animation from '/NotFoundAnimation.json?url';
// import './404.scss';

export default class NotFoundView {
  private notFound: BaseComponentGenerator;

  public notFoundContainer: HTMLDivElement;

  public handleClickGoHomeButton: ((event?: Event) => void) | undefined;

  constructor() {
    this.notFound = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['not-found'],
    });
    this.notFoundContainer = tags.div(['not-found__animation'], '', {});
  }

  public getContent(): HTMLElement {
    return this.notFound.getElement();
  }

  public create() {
    this.createNotFound();
  }

  public createNotFound(): void {
    this.assignAnimation();
    const buttonGoHome = tags.button(
      ['not-found__button'],
      'Go Home',
      {},
      'click',
      this.handleClickGoHomeButton,
    );
    this.notFound.appendChild(this.notFoundContainer);
    this.notFound.appendChild(buttonGoHome);
  }

  public assignAnimation(): void {
    this.notFoundContainer.innerHTML = `<lottie-player src="${animation}" background="transparent"  class="lottie-player" speed="1"  style="width: 600px; height: 600px;" loop autoplay></lottie-player>`;
  }
}
