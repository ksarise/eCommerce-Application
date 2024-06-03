import tags from '../../../tags/tags';
import ProfileFieldBlock from './profileFieldBlocks';
import Heading from '../../../global/enums/profile';

export default class PopUpForm {
  public popUp: HTMLElement;

  private form: HTMLElement;

  public popUpName: ProfileFieldBlock;

  public popUpSurname: ProfileFieldBlock;

  public popUpDateofBirth: ProfileFieldBlock;

  public popUpEmail: ProfileFieldBlock;

  public header: HTMLElement;

  public buttonPersonal: HTMLButtonElement;

  //   public handlePersonalEdit: (event?: Event) => void;

  public popUpStreetName: ProfileFieldBlock;

  public popUppostalCode: ProfileFieldBlock;

  public popUpCity: ProfileFieldBlock;

  public poUpCountry: ProfileFieldBlock;

  public buttonAddAddress: HTMLButtonElement;

  public buttotnEditAddress: HTMLButtonElement;

  public closePopUp: (event: Event) => void;

  constructor() {
    this.popUp = tags
      .div(['profile__popup', 'profile__popup_hidden'])
      .getElement();
    this.form = tags.form(['profile__form'], { type: 'submit' });
    this.closePopUp = (event: Event) => {
      if (event.target === this.popUp) {
        this.openClosePopUp(true);
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
      'dob-popup',
      'Date of Birth',
    );

    this.popUpEmail = new ProfileFieldBlock(
      'Email',
      'email',
      'email-popup',
      'Email',
    );

    this.popUpStreetName = new ProfileFieldBlock(
      'Street',
      'text',
      `street-popup`,
      'Street',
    );

    this.popUppostalCode = new ProfileFieldBlock(
      'Postal Code',
      'text',
      `postalCode-popup`,
      'Postal Code',
    );

    this.popUpCity = new ProfileFieldBlock(
      'City',
      'text',
      `city-popup`,
      'City',
    );
    this.poUpCountry = new ProfileFieldBlock(
      'Country',
      'text',
      `country-popup`,
      'Country',
    );

    this.header = tags.h2(['popup__header'], Heading.CHANGEPERSONAL);
    this.buttonPersonal = tags.button(
      ['profile__save', 'profile__button_popup'],
      'Save',
      { disabled: 'true', type: 'submit', id: 'save-personal' },
    );

    this.buttonAddAddress = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Save',
      { disabled: 'true', type: 'submit', id: 'save-newaddress' },
    );

    this.buttotnEditAddress = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Save',
      { disabled: 'true', type: 'submit', id: 'save-newaddress' },
    );
  }

  public createPopUpBlock() {
    return this.popUp;
  }

  private createPopUp() {
    this.popUp.addEventListener('click', this.closePopUp);
    this.popUp.append(this.form);
  }

  public openClosePopUp(flag: boolean) {
    const body = document.querySelector('body');
    this.popUp.classList.toggle('profile__popup_hidden', flag);
    body?.classList.toggle('body-scroll', !flag);
  }

  private deleteErrors() {
    const elements = [
      this.popUpName,
      this.popUpSurname,
      this.popUpDateofBirth,
      this.popUpEmail,
      this.popUpStreetName,
      this.popUpCity,
      this.poUpCountry,
      this.popUppostalCode,
    ];
    elements.forEach((elem) => {
      elem.fieldError.classList.add('error__hidden');
      elem.fieldInput.classList.remove('input__red');
    });
    this.buttonAddAddress.disabled = true;
    this.buttonPersonal.disabled = true;
    this.buttotnEditAddress.disabled = true;
  }

  public createPersonalForm(
    name: string,
    surname: string,
    dateOfbirth: string,
    email: string,
  ) {
    this.deleteErrors();
    this.form.innerHTML = '';
    this.popUpName.fieldInput.value = name;
    this.popUpSurname.fieldInput.value = surname;
    this.popUpDateofBirth.fieldInput.value = dateOfbirth;
    this.popUpEmail.fieldInput.value = email;
    this.header.innerHTML = Heading.CHANGEPERSONAL;
    this.form.append(
      this.header,
      this.popUpName.getBlock(),
      this.popUpSurname.getBlock(),
      this.popUpDateofBirth.getBlock(),
      this.popUpEmail.getBlock(),
      this.buttonPersonal,
    );
    this.openClosePopUp(false);
  }

  public createAddAddressForm() {
    this.deleteErrors();
    this.header.innerHTML = Heading.ADD;
    this.form.innerHTML = '';
    this.popUpName.fieldInput.value = '';
    this.popUpSurname.fieldInput.value = '';
    this.popUpStreetName.fieldInput.value = '';
    this.popUpCity.fieldInput.value = '';
    this.poUpCountry.fieldInput.value = '';
    this.popUppostalCode.fieldInput.value = '';
    this.popUp.classList.remove('profile__popup_hidden');
    this.createAddressPopUp();
    this.form.append(this.buttonAddAddress);
    this.openClosePopUp(false);
  }

  private createAddressPopUp() {
    this.form.append(
      this.header,
      this.popUpName.getBlock(),
      this.popUpSurname.getBlock(),
      this.popUpStreetName.getBlock(),
      this.popUpCity.getBlock(),
      this.poUpCountry.getBlock(),
      this.popUppostalCode.getBlock(),
    );
  }
}
