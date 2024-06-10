import tags from '../../../tags/tags';
import ProfileFieldBlock from './profileFieldBlocks';
import Heading, { PopupFields } from '../../../global/enums/profile';

export default class PopUpForm {
  public popUp: HTMLElement;

  private form: HTMLElement;

  public popUpName: ProfileFieldBlock;

  public popUpSurname: ProfileFieldBlock;

  public popUpDateofBirth: ProfileFieldBlock;

  public popUpEmail: ProfileFieldBlock;

  public popUpCurrentPassword: ProfileFieldBlock;

  public popUpNewPassword: ProfileFieldBlock;

  public header: HTMLElement;

  public buttonPersonal: HTMLButtonElement;

  public buttonShipping: HTMLButtonElement;

  public buttonBilling: HTMLButtonElement;

  //   public handlePersonalEdit: (event?: Event) => void;

  public popUpStreetName: ProfileFieldBlock;

  public popUppostalCode: ProfileFieldBlock;

  public popUpCity: ProfileFieldBlock;

  public poUpCountry: ProfileFieldBlock;

  public buttonAddAddress: HTMLButtonElement;

  public buttonEditAddress: HTMLButtonElement;

  public buttonChangePassword: HTMLButtonElement;

  public select: HTMLElement;

  public buttonRemoveAddress: HTMLButtonElement;

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

    this.popUpCurrentPassword = new ProfileFieldBlock(
      'Current Password',
      'password',
      'currentpassword-popup',
      'Current Password',
    );

    this.popUpNewPassword = new ProfileFieldBlock(
      'New Password',
      'password',
      'newpassword-popup',
      'New Password',
    );

    this.select = tags.select(['select']);

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

    this.buttonEditAddress = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Save',
      { disabled: 'true', type: 'submit' },
    );
    this.buttonBilling = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Save',
      { disabled: 'true', type: 'submit', id: 'save-billing' },
    );

    this.buttonShipping = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Save',
      { disabled: 'true', type: 'submit', id: 'save-shipping' },
    );
    this.buttonRemoveAddress = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Remove',
      { type: 'submit', id: 'remove-address' },
    );
    this.buttonChangePassword = tags.button(
      ['profile__add', 'profile__button_popup'],
      'Change',
      { type: 'submit', id: 'change-password' },
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
      this.popUpCurrentPassword,
      this.popUpNewPassword,
    ];
    elements.forEach((elem) => {
      elem.fieldError.classList.add('error__hidden');
      elem.fieldInput.classList.remove('input__red');
    });
    this.buttonAddAddress.disabled = true;
    this.buttonPersonal.disabled = true;
    this.buttonEditAddress.disabled = true;
    this.buttonShipping.disabled = true;
    this.buttonBilling.disabled = true;
    this.buttonChangePassword.disabled = true;
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

  public createDeletePopUp(text: string, index: string) {
    this.deleteErrors();
    this.header.innerHTML = text;
    this.form.innerHTML = '';
    this.buttonRemoveAddress.id = `remove__${index}`;
    this.form.append(this.header, this.buttonRemoveAddress);
    this.openClosePopUp(false);
  }

  public createAddAddressForm() {
    this.deleteErrors();
    this.header.innerHTML = Heading.ADD;
    this.form.innerHTML = '';
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
      this.popUpStreetName.getBlock(),
      this.popUpCity.getBlock(),
      this.poUpCountry.getBlock(),
      this.popUppostalCode.getBlock(),
    );
  }

  public createEditAddressForm(
    street: string | undefined,
    city: string | undefined,
    country: string | undefined,
    code: string | undefined,
  ) {
    this.deleteErrors();
    this.header.innerHTML = Heading.CHANGEADDRESS;
    this.form.innerHTML = '';
    this.popUpStreetName.fieldInput.value = street || '';
    this.popUpCity.fieldInput.value = city || '';
    this.poUpCountry.fieldInput.value = country === 'CA' ? 'Canada' : 'USA';
    this.popUppostalCode.fieldInput.value = code || '';
    this.popUp.classList.remove('profile__popup_hidden');
    this.createAddressPopUp();
    this.form.append(this.buttonEditAddress);
    this.openClosePopUp(false);
  }

  public createDefaultAddressForm(text: string, flag: boolean, value?: string) {
    const label = tags.label(['label'], text, { for: this.select.id });
    this.deleteErrors();
    this.form.innerHTML = '';
    const headers = document.querySelectorAll(
      '.addresses__header',
    ) as unknown as HTMLElement[];
    this.select.innerHTML = '';
    headers.forEach((elem) => {
      const code =
        document.getElementById(
          `${PopupFields.CODE}__${elem.id.split('__')[1]}`,
        )?.innerHTML || '';
      const option = tags.option(['option'], `${elem.innerText} ${code}`, {
        value: `${elem.id.split('__')[1]}`,
      });
      this.select.append(option);
    });
    const option = tags.option(['option'], `none`, { value: 'none' });
    if (value !== '' && !value) {
      this.select.append(option);
    }
    (this.select as HTMLSelectElement).value = value || 'none';
    const button = flag ? this.buttonShipping : this.buttonBilling;
    this.header.innerHTML = flag ? Heading.SHIP : Heading.BILL;
    this.form.append(this.header, label, this.select, button);
    this.openClosePopUp(false);
  }

  public createPasswordForm() {
    this.deleteErrors();
    this.header.innerHTML = Heading.PASSWORD;
    this.form.innerHTML = '';
    this.popUpCurrentPassword.fieldInput.value = '';
    this.popUpNewPassword.fieldInput.value = '';
    this.popUp.classList.remove('profile__popup_hidden');
    this.form.append(
      this.header,
      this.popUpCurrentPassword.getBlock(),
      this.popUpNewPassword.getBlock(),
      this.buttonChangePassword,
    );
    this.openClosePopUp(false);
  }
}
