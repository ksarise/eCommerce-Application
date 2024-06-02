import tags from '../../../tags/tags';
import ProfileFieldBlock from './profileFieldBlocks';

export default class PopUpForm {
  private popUp: HTMLElement;

  private form: HTMLElement;

  public popUpName: ProfileFieldBlock;

  public popUpSurname: ProfileFieldBlock;

  public popUpDateofBirth: ProfileFieldBlock;

  public popUpEmail: ProfileFieldBlock;

  public headerPersonal: HTMLElement;

  public buttonPersonal: HTMLElement;

  //   public handlePersonalEdit: (event?: Event) => void;

  public closePopUp: (event: Event) => void;

  constructor() {
    this.popUp = tags
      .div(['profile__popup', 'profile__popup_hidden'])
      .getElement();
    this.form = tags.form(['profile__form'], { type: 'submit' });
    this.closePopUp = (event: Event) => {
      if (event.target === this.popUp) {
        this.popUp.classList.add('profile__popup_hidden');
      }
    };
    this.createPopUp();
    this.popUpName = new ProfileFieldBlock(
      'First Name',
      'text',
      'firstName-popup',
      'First Name',
    );

    this.popUpSurname = new ProfileFieldBlock(
      'Last Name',
      'text',
      'lastName-popup',
      'Last Name',
    );

    this.popUpDateofBirth = new ProfileFieldBlock(
      'Date of Birth',
      'date',
      'dob',
      'Date of Birth',
    );

    this.popUpEmail = new ProfileFieldBlock(
      'Email',
      'email',
      'email-popup',
      'Email',
    );

    this.headerPersonal = tags.h2(
      ['popup__header'],
      'Change Personal Information',
    );
    this.buttonPersonal = tags.button(
      ['profile__save', 'profile__button_popup'],
      'Save',
      { disabled: 'true' },
    );
  }

  public createPopUpBlock() {
    return this.popUp;
  }

  private createPopUp() {
    this.popUp.addEventListener('click', this.closePopUp);
    this.popUp.append(this.form);
  }

  public createPersonalForm(
    name: string,
    surname: string,
    dateOfbirth: string,
    email: string,
  ) {
    this.form.innerHTML = '';
    this.popUpName.fieldInput.value = name;
    this.popUpSurname.fieldInput.value = surname;
    this.popUpDateofBirth.fieldInput.value = dateOfbirth;
    this.popUpEmail.fieldInput.value = email;
    this.form.append(
      this.headerPersonal,
      this.popUpName.getBlock(),
      this.popUpSurname.getBlock(),
      this.popUpDateofBirth.getBlock(),
      this.popUpEmail.getBlock(),
      this.buttonPersonal,
    );
    this.popUp.classList.remove('profile__popup_hidden');
  }
}
