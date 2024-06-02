import tags from '../../../tags/tags';

export default class ProfileFieldBlock {
  public fieldBlock: HTMLElement;

  private fieldLabel: HTMLElement;

  public fieldInput: HTMLInputElement;

  public fieldError: HTMLElement;

  constructor(
    label: string,
    inputType: string,
    name: string,
    placeholder: string,
  ) {
    this.fieldLabel = tags.label(['popup__label', 'label'], label, {
      for: name,
    });
    this.fieldInput = tags.input(['popup__field__input', 'input'], {
      type: inputType,
      name,
      placeholder,
      autocomplete: 'on',
      id: name,
    });
    this.fieldError = tags.span(['popup_error', 'error-hidden']);
    const blockContainer = tags.div(['popup__block']);
    blockContainer.appendChildren([
      this.fieldLabel,
      this.fieldInput,
      this.fieldError,
    ]);
    this.fieldBlock = blockContainer.getElement();
  }

  public getBlock(): HTMLElement {
    return this.fieldBlock;
  }

  public getInput(): HTMLInputElement {
    return this.fieldInput;
  }
}
