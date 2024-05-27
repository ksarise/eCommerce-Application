import tags from '../../../tags/tags';

export default class RegistrationCheckboxBlock {
  private checkboxBlock: HTMLElement;

  private checkboxInput: HTMLInputElement;

  private checkboxLabel: HTMLElement;

  constructor(content: string, name: string) {
    this.checkboxInput = tags.input(['registration__checkbox__input'], {
      type: 'checkbox',
      name,
      id: name,
    });
    this.checkboxLabel = tags.label(
      ['registration__checkbox__label'],
      content,
      {
        type: 'checkbox',
        for: name,
      },
    );
    const blockContainer = tags.div(['registration__checkbox']);
    blockContainer.appendChildren([this.checkboxInput, this.checkboxLabel]);
    this.checkboxBlock = blockContainer.getElement();
  }

  public getBlock(): HTMLElement {
    return this.checkboxBlock;
  }

  public getInput(): HTMLInputElement {
    return this.checkboxInput;
  }
}
