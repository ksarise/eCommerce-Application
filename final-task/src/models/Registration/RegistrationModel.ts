import { RegistrationFormData } from '../../types/types';
import validationRules from './validation/validationRules.json';

type Errors = {
  [key: string]: string[];
};

export default class RegistrationPageModel {
  public errors: Errors;

  constructor() {
    this.errors = {};
  }

  static validatePattern(value: string, pattern: string): boolean {
    const regex = new RegExp(pattern);
    return regex.test(value);
  }

  static validateMinLength(value: string, minLength: number): boolean {
    if (!value) {
      return false;
    }

    return value.length >= minLength;
  }

  static validateFirstCapital(value: string): boolean {
    return /^[A-Z]/.test(value);
  }

  // TODO: Validators need to be refactored to modules
  validateEmail(email: string): void {
    const rule = validationRules.email;
    this.errors.email = [];

    if (!RegistrationPageModel.validatePattern(email, rule.pattern)) {
      this.errors.email.push(rule.errorMessage);
    }

    if (this.errors.email.length === 0) {
      delete this.errors.email;
    }
  }

  validatePassword(password: string): void {
    const rule = validationRules.password;
    this.errors.password = [];

    if (password.length < rule.minLength) {
      this.errors.password.push(rule.errorMessages.minLength);
    }

    if (!RegistrationPageModel.validatePattern(password, rule.uppercase)) {
      this.errors.password.push(rule.errorMessages.uppercase);
    }

    if (!RegistrationPageModel.validatePattern(password, rule.lowercase)) {
      this.errors.password.push(rule.errorMessages.lowercase);
    }

    if (!RegistrationPageModel.validatePattern(password, rule.number)) {
      this.errors.password.push(rule.errorMessages.number);
    }

    if (
      !RegistrationPageModel.validatePattern(password, rule.specialCharacter)
    ) {
      this.errors.password.push(rule.errorMessages.specialCharacter);
    }

    if (!RegistrationPageModel.validatePattern(password, rule.noSpace)) {
      this.errors.password.push(rule.errorMessages.noSpace);
    }

    if (this.errors.password.length === 0) {
      delete this.errors.password;
    }
  }

  validateName(name: string, field: string): void {
    const rule = validationRules.name;
    this.errors[field] = [];

    if (!RegistrationPageModel.validatePattern(name, rule.pattern)) {
      this.errors[field].push(rule.errorMessages.pattern);
    }

    if (!RegistrationPageModel.validateMinLength(name, rule.minLength)) {
      this.errors[field].push(rule.errorMessages.minLength);
    }

    if (
      rule.firstCapital &&
      !RegistrationPageModel.validateFirstCapital(name)
    ) {
      this.errors[field].push(rule.errorMessages.firstCapital);
    }

    if (this.errors[field].length === 0) {
      delete this.errors[field];
    }
  }

  validateDOB(dob: string): void {
    const rule = validationRules.dob;
    const dateOfBirth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
      age -= 1;
    }
    this.errors.dob = [];

    if (age < rule.minAge) {
      this.errors.dob.push(rule.errorMessage);
    }
    if (Number.isNaN(dateOfBirth.getTime())) {
      this.errors.dob.push('Invalid date. Please enter a valid date.');
      return;
    }
    if (dateOfBirth.getFullYear() < 1900) {
      this.errors.dob.push(
        'You are too old for it! Year must be 1900 or later.',
      );
    }
    if (this.errors.dob.length === 0) {
      delete this.errors.dob;
    }
  }

  validateStreet(street: string, field: string): void {
    const rule = validationRules.street;
    this.errors[field] = [];

    if (!RegistrationPageModel.validateMinLength(street, rule.minLength)) {
      this.errors[field].push(rule.errorMessage.minLength);
    }

    if (!RegistrationPageModel.validatePattern(street, rule.pattern)) {
      this.errors[field].push(rule.errorMessage.pattern);
    }

    if (this.errors[field].length === 0) {
      delete this.errors[field];
    }
  }

  validateCity(city: string, field: string): void {
    const rule = validationRules.city;
    this.errors[field] = [];

    if (!RegistrationPageModel.validatePattern(city, rule.pattern)) {
      this.errors[field].push(rule.errorMessages.pattern);
    }

    if (!RegistrationPageModel.validateMinLength(city, rule.minLength)) {
      this.errors[field].push(rule.errorMessages.minLength);
    }

    if (this.errors[field].length === 0) {
      delete this.errors[field];
    }
  }

  validatePostalCode(postalCode: string, country: string, field: string): void {
    const rule = validationRules.postalCode;
    this.errors[field] = [];

    if (!country || !rule.patternUSA || !rule.patternCanada) {
      this.errors[field].push(
        'Please select a valid country before entering a postal code.',
      );
    } else {
      let pattern;
      if (country === 'USA') {
        pattern = rule.patternUSA;
      } else if (country === 'Canada') {
        pattern = rule.patternCanada;
      } else {
        this.errors[field].push('Please select a valid country.');
      }

      if (
        pattern &&
        !RegistrationPageModel.validatePattern(postalCode, pattern)
      ) {
        if (country === 'USA') {
          this.errors[field].push(rule.errorMessages.USA);
        } else if (country === 'Canada') {
          this.errors[field].push(rule.errorMessages.Canada);
        }
      }
    }

    if (this.errors[field].length === 0) {
      delete this.errors[field];
    }
  }

  validateCountry(
    country: string,
    validCountries: string[],
    field: string,
  ): void {
    const rule = validationRules.country;
    this.errors[field] = [];

    if (!validCountries.includes(country)) {
      this.errors[field].push(rule.errorMessage);
    }

    if (this.errors[field].length === 0) {
      delete this.errors[field];
    }
  }

  validateForm(data: RegistrationFormData): Errors {
    this.errors = {};
    this.validateEmail(data.email);
    this.validatePassword(data.password);
    this.validateName(data.firstName, 'firstName');
    this.validateName(data.lastName, 'lastName');
    this.validateDOB(data.dob);
    this.validateStreet(data.street, 'street');
    this.validateCity(data.city, 'city');
    this.validatePostalCode(data.postalCode, data.country, 'postalCode');
    this.validateCountry(data.country, ['USA', 'Canada'], 'country');
    this.validateStreet(data.shippinGstreet, 'shippinGstreet');
    this.validateCity(data.shippinGcity, 'shippinGcity');
    this.validatePostalCode(
      data.shippinGpostalCode,
      data.shippinGcountry,
      'shippinGpostalCode',
    );
    this.validateCountry(
      data.shippinGcountry,
      ['USA', 'Canada'],
      'shippinGcountry',
    );
    return this.errors;
  }
}
