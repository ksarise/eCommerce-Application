/* eslint-disable prefer-destructuring */
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import ProfileModel from '../../models/profile/profileModel';
import ProfileView from '../../views/myProfile/myProfileView';
import RegistrationPageModel from '../../models/Registration/RegistrationModel';
import ProfileFieldBlock from '../../views/myProfile/components/profileFieldBlocks';

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

  private model: ProfileModel;

  public validation: RegistrationPageModel;

  constructor(view: ProfileView, model: ProfileModel) {
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
    this.view.popUpBlock.buttonPersonal.addEventListener('click', (event) => {
      event.preventDefault();
      this.view.popUpBlock.popUp.classList.add('profile__popup_hidden');
    });
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
