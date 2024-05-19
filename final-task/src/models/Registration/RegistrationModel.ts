import { FormData } from '../../types/types';
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

    if (this.errors.dob.length === 0) {
      delete this.errors.dob;
    }
  }

  validateStreet(street: string): void {
    const rule = validationRules.street;
    this.errors.street = [];

    if (!RegistrationPageModel.validateMinLength(street, rule.minLength)) {
      this.errors.street.push(rule.errorMessage);
    }

    if (this.errors.street.length === 0) {
      delete this.errors.street;
    }
  }

  validateCity(city: string): void {
    const rule = validationRules.city;
    this.errors.city = [];

    if (!RegistrationPageModel.validatePattern(city, rule.pattern)) {
      this.errors.city.push(rule.errorMessages.pattern);
    }

    if (!RegistrationPageModel.validateMinLength(city, rule.minLength)) {
      this.errors.city.push(rule.errorMessages.minLength);
    }

    if (this.errors.city.length === 0) {
      delete this.errors.city;
    }
  }

  validatePostalCode(postalCode: string): void {
    const rule = validationRules.postalCode;
    this.errors.postalCode = [];

    if (!RegistrationPageModel.validatePattern(postalCode, rule.pattern)) {
      this.errors.postalCode.push(rule.errorMessage);
    }

    if (this.errors.postalCode.length === 0) {
      delete this.errors.postalCode;
    }
  }

  validateCountry(country: string, validCountries: string[]): void {
    const rule = validationRules.country;
    this.errors.country = [];

    if (!validCountries.includes(country)) {
      this.errors.country.push(rule.errorMessage);
    }

    if (this.errors.country.length === 0) {
      delete this.errors.country;
    }
  }

  validateForm(data: FormData, validCountries: string[]) {
    this.validateEmail(data.email);
    this.validatePassword(data.password);
    this.validateName(data.firstName, 'firstName');
    this.validateName(data.lastName, 'lastName');
    this.validateDOB(data.dob);
    this.validateStreet(data.street);
    this.validateCity(data.city);
    this.validatePostalCode(data.postalCode);
    this.validateCountry(data.country, validCountries);
    return this.errors;
  }
}
