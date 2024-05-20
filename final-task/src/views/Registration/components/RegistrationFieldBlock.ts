import tags from '../../../components/tags';

export default class RegistrationFieldBlock {
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
    this.fieldLabel = tags.label(['registration__label', 'label'], label, {
      for: name,
    });
    this.fieldInput = tags.input(['registration__field__input', 'input'], {
      type: inputType,
      name,
      placeholder,
      autocomplete: 'on',
    });
    this.fieldError = tags.span(['error', 'error-hidden']);
    const blockContainer = tags.div(['registration__block', 'block-input']);
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
