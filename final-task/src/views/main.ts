import tags from '../tags/tags';

export default class MainView {
  private mainContainer: HTMLDivElement;

  constructor() {
    this.mainContainer = tags
      .div(['main'], 'Main page', {})
      .getElement() as HTMLDivElement;
  }

  public getContent(): HTMLElement {
    return this.mainContainer;
  }
}
