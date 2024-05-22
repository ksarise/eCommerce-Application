import BaseComponentGenerator from '../../../components/base-component';
import RegistrationFieldBlock from './RegistrationFieldBlock';
import RegistrationCheckboxBlock from './CheckboxBlock';
import tags from '../../../components/tags';

export default class AddressBlock extends BaseComponentGenerator {
  private streetBlock: RegistrationFieldBlock;

  private cityBlock: RegistrationFieldBlock;

  private postalCodeBlock: RegistrationFieldBlock;

  private countryBlock: RegistrationFieldBlock;

  private titleBlock: string = 'Billing Address';

  public useSameForShippingCheckbox?: RegistrationCheckboxBlock;

  private defaultBillingCheckbox: RegistrationCheckboxBlock;

  private defaultShippingCheckbox?: RegistrationCheckboxBlock;

  constructor(prefix: string = '') {
    super({
      tag: 'div',
      classNames: [`${prefix}address-block`, 'form-login'],
    });
    this.isPrefixTitle(prefix);
    const title = tags.h2(
      [`${prefix}address-block__title`, 'block-title', 'h1-login'],
      this.titleBlock,
    );
    this.streetBlock = new RegistrationFieldBlock(
      'Street',
      'text',
      `${prefix}street`,
      'Street',
    );
    this.cityBlock = new RegistrationFieldBlock(
      'City',
      'text',
      `${prefix}city`,
      'City',
    );
    this.postalCodeBlock = new RegistrationFieldBlock(
      'Postal Code',
      'text',
      `${prefix}postalCode`,
      'Postal Code',
    );
    this.countryBlock = new RegistrationFieldBlock(
      'Country',
      'text',
      `${prefix}country`,
      'Country',
    );

    this.defaultBillingCheckbox = new RegistrationCheckboxBlock(
      'Set as default billing address',
      'defaultBilling',
    );

    if (prefix.length > 1) {
      this.defaultShippingCheckbox = new RegistrationCheckboxBlock(
        'Set as default shipping address',
        'defaultShipping',
      );
    } else {
      this.useSameForShippingCheckbox = new RegistrationCheckboxBlock(
        'Use the same for shipping',
        'useSameForShipping',
      );
    }

    this.appendChildren([
      title,
      this.streetBlock.getBlock(),
      this.cityBlock.getBlock(),
      this.postalCodeBlock.getBlock(),
      this.countryBlock.getBlock(),
    ]);
    this.appendCheckboxes(prefix);
  }

  private isPrefixTitle(prefix: string) {
    if (prefix.length > 1) {
      this.titleBlock = 'Shipping Address';
    }
  }

  private appendCheckboxes(prefix: string) {
    if (prefix.length > 1) {
      this.appendChild(this.defaultShippingCheckbox!.getBlock());
    } else {
      this.appendChildren([
        this.useSameForShippingCheckbox!.getBlock(),
        this.defaultBillingCheckbox.getBlock(),
      ]);
    }
  }

  public getInputs(): HTMLInputElement[] {
    return [
      this.streetBlock.getInput(),
      this.cityBlock.getInput(),
      this.postalCodeBlock.getInput(),
      this.countryBlock.getInput(),
    ];
  }

  public getCheckboxInput(checkboxName: string): HTMLInputElement | null {
    switch (checkboxName) {
      case 'defaultBilling':
        return this.defaultBillingCheckbox.getInput();
      case 'defaultShipping':
        return this.defaultShippingCheckbox?.getInput() || null;
      case 'useSameForShipping':
        return this.useSameForShippingCheckbox?.getInput() || null;
      default:
        return null;
    }
  }
}
