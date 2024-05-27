import BaseComponentGenerator from '../../tags/base-component';
import tags from '../../tags/tags';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import AddressBlock from './components/AddressInfoBlock';
import {
  FormSubmitCallback,
  FieldEventCallback,
} from '../../global/types/registration';
import { RegistrationFormData } from '../../global/interfaces/registration';
import NavigationButtons from './components/NavigationButtons';

export default class RegistrationView {
  private page: BaseComponentGenerator;

  private GeneralInfoBlock: GeneralInfoBlock;

  private BillingAddressBlock: AddressBlock;

  private ShippingAddressBlock: AddressBlock;

  private navigationButtons: NavigationButtons;

  private currentStep: number;

  constructor() {
    this.page = new BaseComponentGenerator({
      tag: 'form',
      classNames: ['registration__page'],
    });

    this.GeneralInfoBlock = new GeneralInfoBlock();
    this.BillingAddressBlock = new AddressBlock();
    this.ShippingAddressBlock = new AddressBlock('shippinG');

    this.navigationButtons = new NavigationButtons();

    const loginLink = tags.a(
      ['register-link'],
      '/login',
      'Already have an account? Login',
      { title: 'Login', 'data-navigo': 'true' },
    );

    this.page.appendChildren([
      this.GeneralInfoBlock.getElement(),
      this.BillingAddressBlock.getElement(),
      this.ShippingAddressBlock.getElement(),
      this.navigationButtons.getButtonsBlock(),
      loginLink,
    ]);
    this.useSameForShipping();
    this.currentStep = 0;
    this.updateFormView();
  }

  public bindNextButton(callback: () => void): void {
    this.navigationButtons.bindNextButton(callback);
  }

  public bindPrevButton(callback: () => void): void {
    this.navigationButtons.bindPrevButton(callback);
  }

  public nextStep() {
    this.currentStep += 1;
    this.updateFormView();
    this.navigationButtons.toggleNextButton(true);
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
    this.navigationButtons.updateFormView(blocks, this.currentStep);
  }

  public toggleNextButton() {
    const currentBlock = [
      this.GeneralInfoBlock.getElement(),
      this.BillingAddressBlock.getElement(),
      this.ShippingAddressBlock.getElement(),
    ][this.currentStep];
    this.navigationButtons.validateCurrentBlock(currentBlock);
  }

  public bindFormSubmit(callback: FormSubmitCallback): void {
    this.page.getElement().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const data: RegistrationFormData = {
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
        defaultBilling: this.BillingAddressBlock.getCheckboxInput(
          'defaultBilling',
        )?.checked as boolean,
        defaultShipping:
          (this.ShippingAddressBlock.getCheckboxInput('defaultShipping')
            ?.checked as boolean) || false,
        isSameAddress:
          (this.BillingAddressBlock.getCheckboxInput('useSameForShipping')
            ?.checked as boolean) || false,
      };
      callback(data);
    });
  }

  public bindFieldInput(callback: FieldEventCallback): void {
    this.page
      .getElement()
      .querySelectorAll('input')
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
      .querySelectorAll('input')
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
        this.navigationButtons.toggleSubmitButton(true);
      }
    }
  }

  public toggleSubmitButton(disabled: boolean): void {
    this.navigationButtons.toggleSubmitButton(disabled);
  }

  public useSameForShipping() {
    this.BillingAddressBlock.useSameForShippingCheckbox!.getBlock().addEventListener(
      'change',
      () => {
        if (
          this.BillingAddressBlock.useSameForShippingCheckbox!.getInput()
            .checked
        ) {
          for (let i = 0; i < 4; i += 1) {
            this.ShippingAddressBlock.getInputs()[i].value =
              this.BillingAddressBlock.getInputs()[i].value;
          }
        }
      },
    );
  }

  public RenderPage(): HTMLElement {
    return this.page.getElement();
  }
}
