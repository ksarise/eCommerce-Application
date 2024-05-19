import RegistrationModel from '../../models/Registration/RegistrationModel';
import RegistrationView from '../../views/Registration/RegistrationView';
import { FormData } from '../../types/types';

export default class RegistrationController {
  private view: RegistrationView;

  private model: RegistrationModel;

  constructor(view: RegistrationView) {
    this.view = view;
    this.model = new RegistrationModel();
    this.init();
  }

  public init() {
    this.view.bindFormSubmit(this.handleFormSubmit.bind(this));
    this.view.bindFieldBlur(this.handleFieldBlur.bind(this));
    this.view.bindFieldInput(this.handleFieldInput.bind(this));
  }

  private handleFormSubmit(formData: FormData) {
    const validCountries = ['USA'];
    const errors = this.model.validateForm(formData, validCountries);

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully', formData);
    } else {
      console.log('Form validation errors', errors);
      Object.entries(errors).forEach(([field, errorMessages]) => {
        this.view.displayFieldError(field, errorMessages[0]);
      });
    }
  }

  private handleFieldBlur(field: string, value: string) {
    this.validateField(field, value);
  }

  private handleFieldInput(field: string, value: string) {
    this.validateField(field, value);
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
        this.model.validateStreet(value);
        break;
      case 'city':
        this.model.validateCity(value);
        break;
      case 'postalCode':
        this.model.validatePostalCode(value);
        break;
      case 'country':
        this.model.validateCountry(value, validCountries);
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
