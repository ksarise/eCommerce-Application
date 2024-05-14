import tags from '../../../components/tags';

export default class RegistrationFieldBlock {
  private fieldBlock: HTMLElement;

  private fieldLabel: HTMLElement;

  public fieldInput: HTMLInputElement;

  constructor(content: string, inputType: string, eventCallback: () => void) {
    this.fieldLabel = tags.legend(['registration__legend'], content);
    this.fieldInput = tags.input(
      ['registration__field__input'],
      eventCallback,
      { type: inputType },
    );
    const BlockContainer = tags.fieldset(['registration__field']);
    BlockContainer.appendChildren([this.fieldLabel, this.fieldInput]);
    this.fieldBlock = BlockContainer.getElement();
  }

  public getBlock(): HTMLElement {
    return this.fieldBlock;
  }

  // public validateForm(value: string, validType: string): void {
  //   if (Validator(value, validType) !== 'ok') {
  //     this.block.classList.remove('valid');
  //     this.errorInput.textContent = `${Validator(value, validType)}`;
  //   } else {
  //     this.block.classList.add('valid');
  //     this.errorInput.textContent = '';
  //   }
  // }
}
