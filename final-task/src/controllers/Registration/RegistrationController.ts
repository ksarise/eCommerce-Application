import { type ErrorResponse } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import RegistrationModel from '../../models/Registration/RegistrationModel';
import RegistrationView from '../../views/Registration/RegistrationView';
import { RegistrationFormData } from '../../types/types';
import createCustomerDraft from './components/CreateCustomerDraft';
import CustomerService from '../../services/CustomerService';
import API from '../../services/ApiRoot';
import 'toastify-js/src/toastify.css';

export default class RegistrationController {
  private view: RegistrationView;

  private model: RegistrationModel;

  private customerService: CustomerService;

  private api: API;

  constructor(view: RegistrationView) {
    this.view = view;
    this.model = new RegistrationModel();
    this.api = new API();
    this.customerService = new CustomerService(this.api);
    this.init();
  }

  public init() {
    this.view.bindNextButton(this.handleNextButtonClick.bind(this));
    this.view.bindPrevButton(this.handlePrevButtonClick.bind(this));
    this.view.bindFormSubmit(this.handleFormSubmit.bind(this));
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

  private async handleFormSubmit(formData: RegistrationFormData) {
    const validCountries = ['USA'];
    const errors = this.model.validateForm(formData, validCountries);

    if (Object.keys(errors).length === 0) {
      const customerDraft = createCustomerDraft(formData);
      try {
        const response =
          await this.customerService.createCustomer(customerDraft);
        Toastify({
          text: `Customer created with ID: ${response.body.customer.id}`,
          duration: 3000,
          gravity: 'top',
          position: 'right',
          style: {
            background:
              'linear-gradient(5deg, rgba(5,162,31,1) 51%, rgba(232,231,225,1) 100%)',
          },
        }).showToast();
        this.afterLogin(formData);
      } catch (error) {
        const errmessage = (error as ErrorResponse).message;
        Toastify({
          text: `${errmessage}`,
          duration: 3000,
          gravity: 'top',
          position: 'right',
          style: {
            background:
              'linear-gradient(5deg, rgba(255,38,0,1) 51%, rgba(255,215,0,1) 100%)',
          },
        }).showToast();
        // const errorResponse = error as ErrorResponse;
        // const errCode = errorResponse.errors && errorResponse.errors[0].code;
        // const errField = errorResponse.errors && errorResponse.errors[0].field;
        // console.log(error, errCode, errField);
        // if (errCode === 'DuplicateField' && errField === 'email') {
        //   this.view.setStep(0);
        //   this.view.displayFieldError('email', 'Email already exists!');
        // }
      }
    } else {
      Toastify({
        text: 'Form validation errors',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background:
            'linear-gradient(5deg, rgba(255,38,0,1) 51%, rgba(255,215,0,1) 100%)',
        },
      }).showToast();

      Object.entries(errors).forEach(([field, errorMessages]) => {
        this.view.displayFieldError(field, errorMessages[0]);
      });
    }
  }

  private handleFieldBlur(field: string, value: string) {
    this.validateField(field, value);
    this.view.toggleNextButton();
  }

  private handleFieldInput(field: string, value: string) {
    this.validateField(field, value);
    this.view.toggleNextButton();
  }

  public async afterLogin(data: RegistrationFormData) {
    try {
      await this.api.postCustomerLogin(data.email, data.password);
      Toastify({
        text: 'Successfully logged in!Redirecting...',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background:
            'linear-gradient(5deg, rgba(5,162,31,1) 51%, rgba(232,231,225,1) 100%)',
        },
      }).showToast();
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('registrationSuccess'));
      }, 2000);
    } catch (error) {
      const errmessage = (error as ErrorResponse).message;
      Toastify({
        text: `${errmessage}`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'red',
      }).showToast();
    }
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
        this.model.validatePostalCode(value, 'postalCode');
        break;
      case 'shippinGpostalCode':
        this.model.validatePostalCode(value, 'shippinGpostalCode');
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
