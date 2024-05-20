import { ErrorResponse } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import RegistrationModel from '../../models/Registration/RegistrationModel';
import RegistrationView from '../../views/Registration/RegistrationView';
import { FormData } from '../../types/types';
import CreateCustomerDraft from './components/CustomerDraftParser';
import CustomerService from '../../services/CustomerService';
import API from '../../services/ApiRoot';
import 'toastify-js/src/toastify.css';

export default class RegistrationController {
  private view: RegistrationView;

  private model: RegistrationModel;

  private customerService: CustomerService;

  constructor(view: RegistrationView) {
    this.view = view;
    this.model = new RegistrationModel();
    const api = new API();
    this.customerService = new CustomerService(api);
    this.init();
  }

  public init() {
    this.view.bindFormSubmit(this.handleFormSubmit.bind(this));
    this.view.bindFieldBlur(this.handleFieldBlur.bind(this));
    this.view.bindFieldInput(this.handleFieldInput.bind(this));
  }

  private async handleFormSubmit(formData: FormData) {
    const validCountries = ['USA'];
    const errors = this.model.validateForm(formData, validCountries);

    if (Object.keys(errors).length === 0) {
      const customerDraft = CreateCustomerDraft(formData);
      try {
        const response =
          await this.customerService.createCustomer(customerDraft);
        Toastify({
          text: `Customer created with ID: ${response.body.customer.id}`,
          duration: 3000,
          gravity: 'top',
          position: 'right',
          backgroundColor:
            'linear-gradient(5deg, rgba(5,162,31,1) 51%, rgba(232,231,225,1) 100%)',
        }).showToast();
      } catch (error) {
        // console.log('Error', typeof error, error);
        const errmessage = (error as ErrorResponse).message;
        Toastify({
          text: `${errmessage}`,
          duration: 3000,
          gravity: 'top',
          position: 'right',
          backgroundColor:
            'linear-gradient(5deg, rgba(255,38,0,1) 51%, rgba(255,215,0,1) 100%)',
        }).showToast();
      }
    } else {
      Toastify({
        text: 'Form validation errors',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor:
          'linear-gradient(5deg, rgba(255,38,0,1) 51%, rgba(255,215,0,1) 100%)',
      }).showToast();

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
