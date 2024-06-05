/* eslint-disable prefer-destructuring */
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import ProfileView from '../../views/myProfile/myProfileView';
import AppModel from '../../models/appModel';
import RegistrationPageModel from '../../models/Registration/RegistrationModel';
import ProfileFieldBlock from '../../views/myProfile/components/profileFieldBlocks';
import showToast from '../../services/ToastMessages';
import { PopupFields } from '../../global/enums/profile';

function handleFieldError(fields: ProfileFieldBlock, error: string[]) {
  const field = fields;
  if (error) {
    field.fieldError.innerHTML = error[0];
    field.fieldError.classList.remove('error__hidden');
    field.fieldInput.classList.add('input__red');
  } else {
    field.fieldError.classList.add('error__hidden');
    field.fieldInput.classList.remove('input__red');
  }
}

function showMessage(text: string, type: 'positive' | 'negative') {
  showToast({
    text,
    type,
  });
}

export default class ProfileController {
  private view: ProfileView;

  private model: AppModel;

  public validation: RegistrationPageModel;

  constructor(view: ProfileView, model: AppModel) {
    this.view = view;
    this.model = model;
    this.validation = new RegistrationPageModel();
  }

  public async init() {
    this.view.personalBlock.handleClickProfileEdit =
      this.handleClickLoginEditPersonal.bind(this);
    this.validateInput(this.view.popUpBlock.popUpName.fieldInput);
    this.validateInput(this.view.popUpBlock.popUpSurname.fieldInput);
    this.validateInput(this.view.popUpBlock.popUpDateofBirth.fieldInput);
    this.validateInput(this.view.popUpBlock.popUpEmail.fieldInput);
    this.validateInput(this.view.popUpBlock.popUpStreetName.fieldInput);
    this.validateInput(this.view.popUpBlock.popUpCity.fieldInput);
    this.validateInput(this.view.popUpBlock.poUpCountry.fieldInput);
    this.validateInput(this.view.popUpBlock.popUppostalCode.fieldInput);
    this.view.popUpBlock.buttonPersonal.addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        await this.sendData();
        await this.view.popUpBlock.openClosePopUp(true);
      },
    );
    this.view.addressesBlock.handleClickEditAddress =
      this.handleClickEditAddress.bind(this);
    this.view.addressesBlock.handleClickAddAddress =
      this.handleClickAddAddress.bind(this);
    this.view.addressesBlock.handleClickEditShipping =
      this.handleClickEditShipping.bind(this);
    this.view.addressesBlock.handleClickEditBilling =
      this.handleClickEditBilling.bind(this);
    this.view.addressesBlock.handleClickRemoveAddress =
      this.removeAddress.bind(this);
    await this.addPopUpClick();
  }

  public async addPopUpClick() {
    this.view.popUpBlock.buttonAddAddress.addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        await this.addOrEditAddress();
      },
    );
    this.view.popUpBlock.buttonEditAddress.addEventListener(
      'click',
      async (event) => {
        const index = this.view.popUpBlock.buttonEditAddress.id.split('-')[1];
        event.preventDefault();
        await this.addOrEditAddress(index);
      },
    );
    this.view.popUpBlock.buttonRemoveAddress.addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        const index = this.view.popUpBlock.buttonRemoveAddress.id.split('-')[1];
        await this.removeAddressServer(index);
      },
    );
    this.view.popUpBlock.select.addEventListener('change', () => {
      this.view.popUpBlock.buttonBilling.disabled = false;
      this.view.popUpBlock.buttonShipping.disabled = false;
    });

    this.view.popUpBlock.buttonBilling.addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        const { value } = this.view.popUpBlock.select as HTMLSelectElement;
        if (value !== 'none') {
          await this.addShippingOrBilling(value, false);
        }
        await this.view.popUpBlock.openClosePopUp(true);
      },
    );
    this.view.popUpBlock.buttonShipping.addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        const { value } = this.view.popUpBlock.select as HTMLSelectElement;
        if (value !== 'none') {
          await this.addShippingOrBilling(value, true);
        }
        await this.view.popUpBlock.openClosePopUp(true);
      },
    );
  }

  private validateInput(element: HTMLElement) {
    element.addEventListener('input', () => {
      this.checkAll();
    });
  }

  private handleClickAddAddress() {
    this.view.popUpBlock.createAddAddressForm();
  }

  public handleClickEditAddress() {
    this.view.popUpBlock.buttonEditAddress.id = `popup-${this.view.addressesBlock.addressesAll.id.split('-')[1]}`;
    const ID = this.view.addressesBlock.addressesAll.id.split('-')[1];
    const name = document.getElementById(
      `${PopupFields.NAME}-${ID}`,
    )?.innerHTML;
    const surname = document.getElementById(
      `${PopupFields.SURNAME}-${ID}`,
    )?.innerHTML;
    const street = document.getElementById(
      `${PopupFields.STREET}-${ID}`,
    )?.innerHTML;
    const city = document.getElementById(
      `${PopupFields.CITY}-${ID}`,
    )?.innerHTML;
    const country = document.getElementById(
      `${PopupFields.COUNTRY}-${ID}`,
    )?.innerHTML;
    const code = document.getElementById(
      `${PopupFields.CODE}-${ID}`,
    )?.innerHTML;
    this.view.popUpBlock.createEditAddressForm(
      name,
      surname,
      street,
      city,
      country,
      code,
    );
  }

  public removeAddress() {
    const index =
      document.querySelector('.profile__all')?.id.split('-')[1] || '';
    const name = (document.getElementById(`heading-${index}`) as HTMLElement)
      .innerText;
    console.log(index, name);
    this.view.popUpBlock.createDeletePopUp(name, index);
  }

  private async addShippingOrBilling(value: string, shipping: boolean) {
    try {
      const { body } = await this.model.getCustomerProfile();
      await this.model.setDefaultAddress(body.version, value, shipping);
      const result = (await this.model.getCustomerProfile()).body;
      await this.updateData(result);
      const text = shipping ? 'shipping' : 'billing';
      showMessage(`Successfully change default ${text} address`, 'positive');
    } catch (error) {
      showMessage(`${error}`, 'negative');
      console.log(error);
    }
  }

  private async removeAddressServer(index: string) {
    await this.view.popUpBlock.openClosePopUp(true);
    try {
      document.getElementById(`bill-${index}`)?.remove();
      document.getElementById(`ship-${index}`)?.remove();
      const { body } = await this.model.getCustomerProfile();
      await this.model.removeAddress(body.version, index);
      const result = (await this.model.getCustomerProfile()).body;
      await this.updateData(result);
      showMessage('Successfully remove address', 'positive');
    } catch (error) {
      showMessage(`${error}`, 'negative');
      console.log(error);
    }
  }

  private async addOrEditAddress(index?: string) {
    await this.view.popUpBlock.openClosePopUp(true);
    try {
      const { body } = await this.model.getCustomerProfile();
      const variables = this.view.popUpBlock;
      await this.model.addOrEditAddress(
        variables.popUpName.getInput().value,
        variables.popUpSurname.getInput().value,
        variables.popUpStreetName.getInput().value,
        variables.popUpCity.getInput().value,
        variables.poUpCountry.getInput().value,
        variables.popUppostalCode.getInput().value,
        body.version,
        index,
      );
      const result = (await this.model.getCustomerProfile()).body;
      await this.updateData(result);
      const text = index
        ? 'Successfully change address'
        : 'Successfully add address';
      showMessage(text, 'positive');
    } catch (error) {
      showMessage(`${error}`, 'negative');
      console.log(error);
    }
  }

  private async sendData() {
    await this.view.popUpBlock.openClosePopUp(true);
    try {
      const { body } = await this.model.getCustomerProfile();
      const variables = this.view.popUpBlock;
      await this.model.changePersonalInfo(
        variables.popUpName.getInput().value,
        variables.popUpSurname.getInput().value,
        variables.popUpDateofBirth.getInput().value,
        variables.popUpEmail.getInput().value,
        body.version,
      );
      const result = (await this.model.getCustomerProfile()).body;
      await this.updateData(result);
      showMessage('Successfully change personal information', 'positive');
      const info = JSON.parse(localStorage.getItem('userCreds') as string);
      info.email = variables.popUpEmail.getInput().value;
      localStorage.setItem('userCreds', JSON.stringify(info));
    } catch (error) {
      showMessage(`${error}`, 'negative');
      console.log(error);
    }
  }

  checkAll() {
    const variables = this.view.popUpBlock;
    this.validation.validateName(
      variables.popUpName.getInput().value,
      'firstName',
    );
    this.validation.validateName(
      variables.popUpSurname.getInput().value,
      'lastName',
    );
    this.validation.validateDOB(variables.popUpDateofBirth.getInput().value);
    this.validation.validateEmail(variables.popUpEmail.getInput().value);
    this.validation.validateStreet(
      variables.popUpStreetName.getInput().value,
      'street',
    );
    this.validation.validateCity(variables.popUpCity.getInput().value, 'city');
    this.validation.validateCountry(
      variables.poUpCountry.getInput().value,
      ['USA', 'Canada'],
      'country',
    );
    this.validation.validatePostalCode(
      variables.popUppostalCode.getInput().value,
      variables.poUpCountry.getInput().value,
      'postalCode',
    );
    this.createErrors();
  }

  private createErrors() {
    const variables = this.view.popUpBlock;
    const { errors } = this.validation;
    if (!errors.firstName && !errors.lastName && !errors.dob && !errors.email) {
      this.view.popUpBlock.buttonPersonal.disabled = false;
    } else {
      this.view.popUpBlock.buttonPersonal.disabled = true;
    }
    if (
      !errors.firstName &&
      !errors.lastName &&
      !errors.street &&
      !errors.city &&
      !errors.country &&
      !errors.postalCode
    ) {
      this.view.popUpBlock.buttonAddAddress.disabled = false;
      this.view.popUpBlock.buttonEditAddress.disabled = false;
    } else {
      this.view.popUpBlock.buttonAddAddress.disabled = true;
      this.view.popUpBlock.buttonEditAddress.disabled = true;
    }
    handleFieldError(variables.popUpName, errors.firstName);
    handleFieldError(variables.popUpSurname, errors.lastName);
    handleFieldError(variables.popUpDateofBirth, errors.dob);
    handleFieldError(variables.popUpEmail, errors.email);
    handleFieldError(variables.popUpStreetName, errors.street);
    handleFieldError(variables.popUpCity, errors.city);
    handleFieldError(variables.poUpCountry, errors.country);
    handleFieldError(variables.popUppostalCode, errors.postalCode);
  }

  public updateData(body: Customer) {
    if (body.firstName && body.lastName && body.dateOfBirth && body.email) {
      this.view.personalBlock.changePersonalInfo(
        body.firstName,
        body.lastName,
        body.dateOfBirth,
        body.email,
      );
    }
    this.view.addressesBlock.changeAddresses(body);
    this.view.addressesBlock.defaultAddresses(body);
  }

  public handleClickLoginEditPersonal() {
    const variables = this.view.personalBlock;
    this.view.popUpBlock.createPersonalForm(
      variables.profileName.innerHTML,
      variables.profileSurname.innerHTML,
      variables.profileDateofBirth.innerHTML,
      variables.profileEmail.innerHTML,
    );
  }

  private handleClickEditShipping() {
    const id = document
      .querySelector('.addresses__header_ship')
      ?.id.split('-')[1];
    this.view.popUpBlock.createDefaultAddressForm(
      'Default Shipping Address',
      true,
      id,
    );
  }

  private handleClickEditBilling() {
    const id = document
      .querySelector('.addresses__header_bill')
      ?.id.split('-')[1];
    this.view.popUpBlock.createDefaultAddressForm(
      'Default Billing Address',
      false,
      id,
    );
  }
}
