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
    this.view.popUpBlock.popUpName.fieldInput.addEventListener('input', () => {
      this.checkAll();
    });
    this.view.popUpBlock.popUpEmail.fieldInput.addEventListener('input', () => {
      this.checkAll();
    });
    this.view.popUpBlock.popUpDateofBirth.fieldInput.addEventListener(
      'input',
      () => {
        this.checkAll();
      },
    );
    this.view.popUpBlock.popUpSurname.fieldInput.addEventListener(
      'input',
      () => {
        this.checkAll();
      },
    );
    this.view.popUpBlock.buttonPersonal.addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        await this.sendData();
        await this.view.popUpBlock.popUp.classList.add('profile__popup_hidden');
      },
    );
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
    this.createErrors();
  }

  createErrors() {
    const variables = this.view.popUpBlock;
    const { errors } = this.validation;
    if (!errors.firstName && !errors.lastName && !errors.dob && !errors.email) {
      this.view.popUpBlock.buttonPersonal.disabled = false;
    } else {
      this.view.popUpBlock.buttonPersonal.disabled = true;
    }
    handleFieldError(variables.popUpName, errors.firstName);
    handleFieldError(variables.popUpSurname, errors.lastName);
    handleFieldError(variables.popUpDateofBirth, errors.dob);
    handleFieldError(variables.popUpEmail, errors.email);
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
