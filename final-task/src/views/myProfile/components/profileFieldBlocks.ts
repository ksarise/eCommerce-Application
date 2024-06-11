import tags from '../../../tags/tags';

export default class ProfileFieldBlock {
  public fieldBlock: HTMLElement;

  private fieldLabel: HTMLElement;

  public fieldInput: HTMLInputElement;

  public fieldError: HTMLElement;

  public fieldCheckBox: HTMLElement;

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
    this.fieldError = tags.span(['popup__error']);
    const blockContainer = tags.div(['popup__block']);
    blockContainer.appendChildren([
      this.fieldLabel,
      this.fieldInput,
      this.fieldError,
    ]);
    this.fieldBlock = blockContainer.getElement();
    this.fieldCheckBox = tags
      .div(['visible__password', 'hidden_password'])
      .getElement();
    this.addVisiblePassword();
  }

  private addVisiblePassword() {
    if (this.fieldInput.type === 'password') {
      this.fieldBlock.append(this.fieldCheckBox);
      this.fieldCheckBox.addEventListener('click', () => {
        if (this.fieldInput.type === 'password') {
          this.fieldInput.type = 'text';
          this.fieldCheckBox.classList.toggle('hidden_password', false);
        } else {
          this.hidePassword();
        }
      });
    }
  }

  public hidePassword() {
    this.fieldInput.type = 'password';
    this.fieldCheckBox.classList.toggle('hidden_password', true);
  }

  public getBlock(): HTMLElement {
    return this.fieldBlock;
  }

  public getInput(): HTMLInputElement {
    return this.fieldInput;
  }
}
