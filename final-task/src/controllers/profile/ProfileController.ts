/* eslint-disable prefer-destructuring */
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import ProfileView from '../../views/myProfile/myProfileView';
import AppModel from '../../models/appModel';
import RegistrationPageModel from '../../models/Registration/RegistrationModel';
import ProfileFieldBlock from '../../views/myProfile/components/profileFieldBlocks';
import showToast from '../../services/ToastMessages';

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

export default class ProfileController {
  private view: ProfileView;

  private model: AppModel;

  public validation: RegistrationPageModel;

  constructor(view: ProfileView, model: AppModel) {
    this.view = view;
    this.model = model;
    this.validation = new RegistrationPageModel();
  }

  public init() {
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
        this.view.popUpBlock.buttonPersonal.disabled = true;
      },
    );
    this.view.addressesBlock.handleClickAddAddress =
      this.handleClickAddAddress.bind(this);
  }

  private validateInput(element: HTMLElement) {
    element.addEventListener('input', () => {
      this.checkAll();
    });
  }

  public handleClickAddAddress() {
    this.view.popUpBlock.createAddAddressForm();
  }

  async sendData() {
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
      showToast({
        text: 'Successfully change personal information',
        type: 'positive',
      });
    } catch (error) {
      showToast({
        text: `${error}`,
        type: 'negative',
      });
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
    } else {
      this.view.popUpBlock.buttonAddAddress.disabled = true;
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
}
