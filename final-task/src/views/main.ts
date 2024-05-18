import tags from '../tags/tags';

export default class MainView {
  private mainContainer: HTMLDivElement;

  constructor() {
    this.mainContainer = tags.div(['main'], 'Main page', {});
  }

  public getContent(): HTMLElement {
    return this.mainContainer;
  }
}
