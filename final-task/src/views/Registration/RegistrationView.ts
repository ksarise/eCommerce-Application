import BaseComponentGenerator from '../../components/base-component';
import tags from '../../components/tags';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import AddressBlock from './components/AddressInfoBlock';
import './registration.scss';
import { FormSubmitCallback, FieldEventCallback } from '../../types/types';
import RegistrationCheckboxBlock from './components/CheckboxBlock';

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

  private BillingAddressBlock: AddressBlock;

  private ShippingAddressBlock: AddressBlock;

  private SubmitButton: HTMLButtonElement;

  private useSameForShippingCheckbox: RegistrationCheckboxBlock;

  private defaultBillingCheckbox: RegistrationCheckboxBlock;

  private defaultShippingCheckbox: RegistrationCheckboxBlock;

  private nextButton: HTMLButtonElement;

  private prevButton: HTMLButtonElement;

  private currentStep: number;

  constructor() {
    this.page = new BaseComponentGenerator({
      tag: 'form',
      classNames: ['registration__page'],
    });

    this.GeneralInfoBlock = new GeneralInfoBlock();
    this.BillingAddressBlock = new AddressBlock();
    this.useSameForShippingCheckbox = new RegistrationCheckboxBlock(
      'Use the same for shipping',
      'useSameForShipping',
    );
    this.defaultBillingCheckbox = new RegistrationCheckboxBlock(
      'Set as default billing address',
      'defaultBilling',
    );
    this.BillingAddressBlock.appendChildren([
      this.useSameForShippingCheckbox.getBlock(),
      this.defaultBillingCheckbox.getBlock(),
    ]);
    this.useSameForShippingCheckbox
      .getBlock()
      .addEventListener('change', () => {
        if (this.useSameForShippingCheckbox.getInput().checked) {
          for (let i = 0; i < 4; i += 1) {
            this.ShippingAddressBlock.getInputs()[i].value =
              this.BillingAddressBlock.getInputs()[i].value;
          }
        }
      });

    this.ShippingAddressBlock = new AddressBlock('shippinG');
    this.defaultShippingCheckbox = new RegistrationCheckboxBlock(
      'Set as default shipping address',
      'defaultShipping',
    );
    this.ShippingAddressBlock.appendChild(
      this.defaultShippingCheckbox.getBlock(),
    );

    this.SubmitButton = tags.button(
      ['submit-btn', 'button-login'],
      'Register',
    ) as HTMLButtonElement;
    this.SubmitButton.disabled = true;

    this.nextButton = tags.button(['next-btn', 'button-login'], 'Next', {
      type: 'button',
      disabled: 'on',
    });
    this.prevButton = tags.button(['prev-btn', 'button-login'], 'Previous', {
      type: 'button',
      disabled: 'on',
    });
    const buttonsBlock = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['registration__button-block'],
    });
    buttonsBlock.appendChildren([
      this.prevButton,
      this.nextButton,
      this.SubmitButton,
    ]);
    this.page.appendChildren([
      this.GeneralInfoBlock.getElement(),
      this.BillingAddressBlock.getElement(),
      this.ShippingAddressBlock.getElement(),
      buttonsBlock.getElement(),
    ]);

    this.currentStep = 0;

    this.updateFormView();
  }

  public bindNextButton(callback: () => void): void {
    this.nextButton.addEventListener('click', callback);
  }

  public bindPrevButton(callback: () => void): void {
    this.prevButton.addEventListener('click', callback);
  }

  public nextStep() {
    this.currentStep += 1;
    this.updateFormView();
    this.nextButton.disabled = true;
  }

  public prevStep() {
    this.currentStep -= 1;
    this.updateFormView();
  }

  private updateFormView() {
    const blocks = [
      this.GeneralInfoBlock.getElement(),
      this.BillingAddressBlock.getElement(),
      this.ShippingAddressBlock.getElement(),
    ];

    blocks.forEach((originalBlock, index) => {
      const block = originalBlock;
      block.style.display = this.currentStep === index ? 'flex' : 'none';
      blocks[index] = block;
    });

    this.prevButton.style.display = this.currentStep > 0 ? 'flex' : 'none';
    if (this.currentStep === 0) {
      this.prevButton.disabled = true;
    } else {
      this.prevButton.disabled = false;
    }
    this.nextButton.style.display =
      this.currentStep < blocks.length - 1 ? 'flex' : 'none';
    this.SubmitButton.style.display =
      this.currentStep === blocks.length - 1 ? 'flex' : 'none';
  }

  public toggleNextButton() {
    const currentBlock = [
      this.GeneralInfoBlock.getElement(),
      this.BillingAddressBlock.getElement(),
      this.ShippingAddressBlock.getElement(),
    ][this.currentStep];

    const inputs = currentBlock.querySelectorAll('.registration__field__input');
    const hasInvalidElements =
      currentBlock.querySelectorAll('.invalid').length > 0;
    const allFieldsFilled = Array.from(inputs).every(
      (input) => (input as HTMLInputElement).value.trim() !== '',
    );

    this.nextButton.disabled = hasInvalidElements || !allFieldsFilled;
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
    const errorSpan = fieldContainer?.querySelector('.error');
    if (fieldContainer && errorSpan) {
      if (errorMessage) {
        errorSpan.classList.remove('error-hidden');
        errorSpan.textContent = errorMessage;
      } else {
        errorSpan.textContent = '';
        errorSpan.classList.add('error-hidden');
      }
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
