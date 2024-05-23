import BaseComponentGenerator from '../../../components/base-component';
import RegistrationFieldBlock from './RegistrationFieldBlock';
import tags from '../../../tags/tags';

export default class GeneralInfoBlock extends BaseComponentGenerator {
  private emailBlock: RegistrationFieldBlock;

  private passwordBlock: RegistrationFieldBlock;

  private firstNameBlock: RegistrationFieldBlock;

  private lastNameBlock: RegistrationFieldBlock;

  private checkBox: HTMLInputElement;

  private checkBoxLabel: HTMLLabelElement;

  private dobBlock: RegistrationFieldBlock;

  constructor() {
    super({ tag: 'div', classNames: ['general-info-block', 'form-login'] });
    const title = tags.h2(
      ['general-info-block__title', 'block-title', 'h1-login'],
      'General Info',
    );
    this.emailBlock = new RegistrationFieldBlock(
      'Email',
      'email',
      'email',
      'Email',
    );
    this.passwordBlock = new RegistrationFieldBlock(
      'Password',
      'password',
      'password',
      'Password',
    );
    this.checkBox = tags.input(['password-visible'], {
      type: 'checkbox',
      name: 'password-visible',
      id: 'VisiblePassword',
      title: 'view password',
    });
    this.checkBoxLabel = tags.label(['password-visible-label'], '', {
      for: 'VisiblePassword',
    });
    this.passwordBlock.getBlock().append(this.checkBox, this.checkBoxLabel);
    this.firstNameBlock = new RegistrationFieldBlock(
      'First Name',
      'text',
      'firstName',
      'First Name',
    );
    this.lastNameBlock = new RegistrationFieldBlock(
      'Last Name',
      'text',
      'lastName',
      'Last Name',
    );
    this.dobBlock = new RegistrationFieldBlock(
      'Date of Birth',
      'date',
      'dob',
      'Date of Birth',
    );
    this.setDOBInputOptions();
    this.appendChildren([
      title,
      this.emailBlock.getBlock(),
      this.passwordBlock.getBlock(),
      this.firstNameBlock.getBlock(),
      this.lastNameBlock.getBlock(),
      this.dobBlock.getBlock(),
    ]);
    this.togglePasswordVisibility();
  }

  private togglePasswordVisibility() {
    this.checkBox.addEventListener('click', () => {
      if (this.passwordBlock.getInput().type === 'password') {
        this.passwordBlock.getInput().type = 'text';
        this.checkBoxLabel.style.backgroundImage =
          'url(/eye-password-show.svg)';
      } else {
        this.passwordBlock.getInput().type = 'password';
        this.checkBoxLabel.style.backgroundImage =
          'url(/eye-password-hide.svg)';
      }
    });
  }

  private setDOBInputOptions() {
    const todayDate = new Date();
    [this.dobBlock.getInput().max] = todayDate.toISOString().split('T');
    [this.dobBlock.getInput().min] = '1900-01-01';
    this.dobBlock.getInput().addEventListener('input', () => {
      const selectedDate = new Date(this.dobBlock.getInput().value);
      if (selectedDate > todayDate) {
        [this.dobBlock.getInput().value] = todayDate.toISOString().split('T');
      }
    });
  }

  public getInputs(): HTMLInputElement[] {
    return [
      this.emailBlock.getInput(),
      this.passwordBlock.getInput(),
      this.firstNameBlock.getInput(),
      this.lastNameBlock.getInput(),
      this.dobBlock.getInput(),
    ];
  }
}
