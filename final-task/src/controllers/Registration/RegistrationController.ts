import RegistrationModel from '../../models/Registration/RegistrationModel';
import RegistrationView from '../../views/Registration/RegistrationView';

export default class RegistrationController {
  private view: RegistrationView;

  private model: RegistrationModel;

  constructor(view: RegistrationView, model: RegistrationModel) {
    this.view = view;
    this.model = model;
  }

  public init() {
    this.view.bindNextButton(this.handleNextButtonClick.bind(this));
    this.view.bindPrevButton(this.handlePrevButtonClick.bind(this));
    this.view.bindFieldBlur(this.handleFieldBlur.bind(this));
    this.view.bindFieldInput(this.handleFieldInput.bind(this));
  }

  private handleNextButtonClick() {
    this.view.nextStep();
    this.view.toggleNextButton();
  }

  private handlePrevButtonClick() {
    this.view.prevStep();
    this.view.toggleNextButton();
  }

  private handleFieldBlur(field: string, value: string) {
    this.validateField(field, value);
    this.view.toggleNextButton();
  }

  private handleFieldInput(field: string, value: string) {
    this.validateField(field, value);
    this.view.toggleNextButton();
  }

  private validateField(field: string, value: string) {
    const validCountries = ['USA'];
    let isValid = true;
    switch (field) {
      case 'email':
        this.model.validateEmail(value);
        break;
      case 'password':
        this.model.validatePassword(value);
        break;
      case 'firstName':
        this.model.validateName(value, 'firstName');
        break;
      case 'lastName':
        this.model.validateName(value, 'lastName');
        break;
      case 'dob':
        this.model.validateDOB(value);
        break;
      case 'street':
        this.model.validateStreet(value, 'street');
        break;
      case 'shippinGstreet':
        this.model.validateStreet(value, 'shippinGstreet');
        break;
      case 'city':
        this.model.validateCity(value, 'city');
        break;
      case 'shippinGcity':
        this.model.validateCity(value, 'shippinGcity');
        break;
      case 'postalCode':
        this.model.validatePostalCode(
          value,
          (document.getElementById('country') as HTMLInputElement).value,
          'postalCode',
        );
        break;
      case 'shippinGpostalCode':
        this.model.validatePostalCode(
          value,
          (document.getElementById('shippinGcountry') as HTMLInputElement)
            .value,
          'shippinGpostalCode',
        );
        break;
      case 'country':
        this.model.validateCountry(value, validCountries, 'country');
        break;
      case 'shippinGcountry':
        this.model.validateCountry(value, validCountries, 'shippinGcountry');
        break;
      default:
        break;
    }
    const errorMessages = this.model.errors[field];
    // set input field validity
    if (errorMessages && errorMessages.length > 0) {
      isValid = false;
    }
    this.view.setFieldValidity(field, isValid);

    // toggle submit button if there are any errors
    const hasErrors = Object.values(this.model.errors).some(
      (errors) => errors.length > 0,
    );
    this.view.toggleSubmitButton(hasErrors);
    this.view.displayFieldError(
      field,
      errorMessages ? errorMessages[0] : undefined,
    );
  }
}
