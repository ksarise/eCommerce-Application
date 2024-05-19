import tags from '../../../components/tags';

export default class RegistrationFieldBlock {
  private fieldBlock: HTMLElement;

  private fieldLabel: HTMLElement;

  public fieldInput: HTMLInputElement;

  constructor(
    legend: string,
    inputType: string,
    name: string,
    placeholder: string,
  ) {
    this.fieldLabel = tags.legend(['registration__label'], legend);
    this.fieldInput = tags.input(['registration__field__input'], {
      type: inputType,
      name,
      placeholder,
    });
    const blockContainer = tags.fieldset(['registration__field']);
    blockContainer.appendChildren([this.fieldLabel, this.fieldInput]);
    this.fieldBlock = blockContainer.getElement();
  }

  public getBlock(): HTMLElement {
    return this.fieldBlock;
  }

  public getInput(): HTMLInputElement {
    return this.fieldInput;
  }
}
