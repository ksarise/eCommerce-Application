import BaseComponentGenerator from '../../components/base-component';
import tags from '../../components/tags';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import AddressBlock from './components/AddressInfoBlock';
import './registration.scss';
import { FormSubmitCallback, FieldEventCallback } from '../../types/types';

// Cant import interface from types wtf
interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export default class RegistrationView {
  private page: BaseComponentGenerator;

  private GeneralInfoBlock: GeneralInfoBlock;

  private AddressInfoBlock: AddressBlock;

  private SubmitButton: HTMLButtonElement;

  private errorContainer: HTMLElement;

  constructor() {
    this.page = new BaseComponentGenerator({
      tag: 'form',
      classNames: ['registration__page'],
    });
    this.GeneralInfoBlock = new GeneralInfoBlock();
    this.AddressInfoBlock = new AddressBlock();
    this.SubmitButton = tags.button(
      ['submit-btn'],
      'Register',
    ) as HTMLButtonElement;
    this.SubmitButton.disabled = true;
    this.errorContainer = tags.div(['error-container'], '').getElement();

    this.page.appendChildren([
      this.GeneralInfoBlock.getElement(),
      this.AddressInfoBlock.getElement(),
      this.SubmitButton,
      this.errorContainer,
    ]);
  }

  public bindFormSubmit(callback: FormSubmitCallback): void {
    this.page.getElement().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const data: FormData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        dob: formData.get('dob') as string,
        street: formData.get('street') as string,
        city: formData.get('city') as string,
        postalCode: formData.get('postalCode') as string,
        country: formData.get('country') as string,
      };
      callback(data);
    });
  }

  public bindFieldInput(callback: FieldEventCallback): void {
    this.page
      .getElement()
      .querySelectorAll('input, select')
      .forEach((element: Element) => {
        element.addEventListener('input', (event: Event) => {
          const target = event.target as HTMLInputElement | HTMLSelectElement;
          const field = target.name;
          const { value } = target;
          callback(field, value);
        });
      });
  }

  public bindFieldBlur(callback: FieldEventCallback): void {
    this.page
      .getElement()
      .querySelectorAll('input, select')
      .forEach((element: Element) => {
        element.addEventListener('blur', (event: Event) => {
          const target = event.target as HTMLInputElement | HTMLSelectElement;
          const field = target.name;
          const { value } = target;
          callback(field, value);
        });
      });
  }

  public displayFieldError(
    field: string,
    errorMessage: string | undefined,
  ): void {
    const fieldContainer = this.page
      .getElement()
      .querySelector(`[name="${field}"]`)?.parentElement;
    let errorSpan = fieldContainer?.querySelector('.error-message');

    if (!errorSpan) {
      errorSpan = tags.span(['error-message']);
      fieldContainer?.appendChild(errorSpan);
    }

    if (errorMessage) {
      errorSpan.textContent = errorMessage;
    } else {
      errorSpan.textContent = '';
    }
  }

  public setFieldValidity(field: string, isValid: boolean): void {
    const inputElement = document.querySelector(
      `[name="${field}"]`,
    ) as HTMLInputElement;
    if (inputElement) {
      if (isValid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
      } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        this.SubmitButton.disabled = true;
      }
    }
  }

  public toggleSubmitButton(disabled: boolean): void {
    this.SubmitButton.disabled = disabled;
  }

  public RenderPage(): HTMLElement {
    return this.page.getElement();
  }
}
