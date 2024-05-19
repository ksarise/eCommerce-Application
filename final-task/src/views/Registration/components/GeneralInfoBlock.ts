import BaseComponentGenerator from '../../../components/base-component';
import RegistrationFieldBlock from './RegistrationFieldBlock';

export default class GeneralInfoBlock extends BaseComponentGenerator {
  private emailBlock: RegistrationFieldBlock;

  private passwordBlock: RegistrationFieldBlock;

  private firstNameBlock: RegistrationFieldBlock;

  private lastNameBlock: RegistrationFieldBlock;

  private dobBlock: RegistrationFieldBlock;

  constructor() {
    super({ tag: 'div', classNames: ['general-info-block'] });
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
    const todayDate = new Date();
    [this.dobBlock.getInput().max] = todayDate.toISOString().split('T');
    this.dobBlock.getInput().addEventListener('input', () => {
      const selectedDate = new Date(this.dobBlock.getInput().value);
      if (selectedDate > todayDate) {
        [this.dobBlock.getInput().value] = todayDate.toISOString().split('T');
      }
    });
    this.appendChildren([
      this.emailBlock.getBlock(),
      this.passwordBlock.getBlock(),
      this.firstNameBlock.getBlock(),
      this.lastNameBlock.getBlock(),
      this.dobBlock.getBlock(),
    ]);
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
