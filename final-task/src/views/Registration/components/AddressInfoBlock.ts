import BaseComponentGenerator from '../../../components/base-component';
import RegistrationFieldBlock from './RegistrationFieldBlock';
import tags from '../../../components/tags';

export default class AddressBlock extends BaseComponentGenerator {
  private streetBlock: RegistrationFieldBlock;

  private cityBlock: RegistrationFieldBlock;

  private postalCodeBlock: RegistrationFieldBlock;

  private countryBlock: RegistrationFieldBlock;

  private titleBlock: string = 'Billing Address';

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

    this.appendChildren([
      title,
      this.streetBlock.getBlock(),
      this.cityBlock.getBlock(),
      this.postalCodeBlock.getBlock(),
      this.countryBlock.getBlock(),
    ]);
  }

  private isPrefixTitle(prefix: string) {
    if (prefix.length > 1) {
      this.titleBlock = 'Shipping Address';
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
}
