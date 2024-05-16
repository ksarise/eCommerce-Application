import BaseComponentGenerator from '../tags/base-component';
import tags from '../tags/tags';

export default class MainView {
  private mainContainer: BaseComponentGenerator;

  constructor() {
    this.mainContainer = tags.div(['container'], 'Main page', {});
  }

  public getContent(): HTMLElement {
    return this.mainContainer.getElement();
  }
}
