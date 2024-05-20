import BaseComponentGenerator from '../../../components/base-component';
import RegistrationFieldBlock from './RegistrationFieldBlock';
import tags from '../../../components/tags';

export default class AddressBlock extends BaseComponentGenerator {
  private streetBlock: RegistrationFieldBlock;

  private cityBlock: RegistrationFieldBlock;

  private postalCodeBlock: RegistrationFieldBlock;

  private countryBlock: RegistrationFieldBlock;

  constructor(prefix: string = '') {
    super({ tag: 'div', classNames: [`${prefix}address-block`] });
    const title = tags.p([`${prefix}address-block__title`], `${prefix}Address`);
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

  public getInputs(): HTMLInputElement[] {
    return [
      this.streetBlock.getInput(),
      this.cityBlock.getInput(),
      this.postalCodeBlock.getInput(),
      this.countryBlock.getInput(),
    ];
  }
}
