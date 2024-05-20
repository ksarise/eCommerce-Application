import BaseComponentGenerator from '../../components/base-component';
import tags from '../../components/tags';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import AddressBlock from './components/AddressInfoBlock';
import './registration.scss';
import { FormSubmitCallback, FieldEventCallback } from '../../types/types';
import RegistrationCheckboxBlock from './components/CheckboxBlock';

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
  shippinGstreet: string;
  shippinGcity: string;
  shippinGpostalCode: string;
  shippinGcountry: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
  isSameAddress: boolean;
}

export default class RegistrationView {
  private page: BaseComponentGenerator;

  private GeneralInfoBlock: GeneralInfoBlock;

  private AddressInfoBlock: AddressBlock;

  private ShippingAddressBlock: AddressBlock;

  private SubmitButton: HTMLButtonElement;

  private useSameForShippingCheckbox: RegistrationCheckboxBlock;

  private defaultBillingCheckbox: RegistrationCheckboxBlock;

  private defaultShippingCheckbox: RegistrationCheckboxBlock;

  constructor() {
    this.page = new BaseComponentGenerator({
      tag: 'form',
      classNames: ['registration__page'],
    });
    this.GeneralInfoBlock = new GeneralInfoBlock();
    this.AddressInfoBlock = new AddressBlock();
    this.useSameForShippingCheckbox = new RegistrationCheckboxBlock(
      'Use the same for shipping',
      'useSameForShipping',
    );
    this.defaultBillingCheckbox = new RegistrationCheckboxBlock(
      'Set as default billing address',
      'defaultBilling',
    );
    this.defaultShippingCheckbox = new RegistrationCheckboxBlock(
      'Set as default shipping address',
      'defaultShipping',
    );
    this.useSameForShippingCheckbox
      .getBlock()
      .addEventListener('change', () => {
        if (this.useSameForShippingCheckbox.getInput().checked) {
          for (let i = 0; i < 4; i += 1) {
            this.ShippingAddressBlock.getInputs()[i].value =
              this.AddressInfoBlock.getInputs()[i].value;
          }
        }
      });

    // TODO: stop being lazy and set a normal prefix
    this.ShippingAddressBlock = new AddressBlock('shippinG');
    this.SubmitButton = tags.button(
      ['submit-btn'],
      'Register',
    ) as HTMLButtonElement;
    this.SubmitButton.disabled = true;

    this.page.appendChildren([
      this.GeneralInfoBlock.getElement(),
      this.AddressInfoBlock.getElement(),
      this.useSameForShippingCheckbox.getBlock(),
      this.defaultBillingCheckbox.getBlock(),
      this.ShippingAddressBlock.getElement(),
      this.defaultShippingCheckbox.getBlock(),
      this.SubmitButton,
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
        shippinGstreet: formData.get('shippinGstreet') as string,
        shippinGcity: formData.get('shippinGcity') as string,
        shippinGpostalCode: formData.get('shippinGpostalCode') as string,
        shippinGcountry: formData.get('shippinGcountry') as string,
        defaultBilling: this.defaultBillingCheckbox.getInput()
          .checked as boolean,
        defaultShipping: this.defaultShippingCheckbox.getInput()
          .checked as boolean,
        isSameAddress: this.useSameForShippingCheckbox.getInput()
          .checked as boolean,
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

  // private copyAddress(): void {
  //   if (this.useSameForShippingCheckbox.getInput().checked) {
  //     const addressData = this.getAddressData();
  //     this.setAddressData(addressData, 'shipping');
  //   }
  // }

  public RenderPage(): HTMLElement {
    return this.page.getElement();
  }
}
