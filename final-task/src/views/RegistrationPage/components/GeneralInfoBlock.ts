import tags from '../../../components/tags';
import RegistrationFieldBlock from './RegistrationFieldBlock';

export default class GeneralInfoBlock {
  private GeneralInfoBlock: HTMLElement;

  private emailBlock: HTMLElement;

  private passwordBlock: HTMLElement;

  private firstNameBlock: HTMLElement;

  private lastNameBlock: HTMLElement;

  private dateOfBirthBlock: HTMLElement;

  constructor() {
    this.emailBlock = new RegistrationFieldBlock(
      'Email',
      'email',
      () => {},
    ).getBlock();
    this.passwordBlock = new RegistrationFieldBlock(
      'Password',
      'password',
      () => {},
    ).getBlock();
    this.firstNameBlock = new RegistrationFieldBlock(
      'Name',
      'text',
      () => {},
    ).getBlock();
    this.lastNameBlock = new RegistrationFieldBlock(
      'Last name',
      'text',
      () => {},
    ).getBlock();

    this.dateOfBirthBlock = new RegistrationFieldBlock(
      'Date of birth',
      'text',
      () => {},
    ).getBlock();

    const generalContainer = tags.div(['registration__general-container']);
    generalContainer.appendChildren([
      this.emailBlock,
      this.passwordBlock,
      this.firstNameBlock,
      this.lastNameBlock,
      this.dateOfBirthBlock,
    ]);

    this.GeneralInfoBlock = generalContainer.getElement();
  }

  public getElement() {
    return this.GeneralInfoBlock;
  }
}
