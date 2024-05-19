import BaseComponentGenerator from '../../../components/base-component';
import RegistrationFieldBlock from './RegistrationFieldBlock';

export default class AddressBlock extends BaseComponentGenerator {
  private streetBlock: RegistrationFieldBlock;

  private cityBlock: RegistrationFieldBlock;

  private postalCodeBlock: RegistrationFieldBlock;

  private countryBlock: RegistrationFieldBlock;

  constructor() {
    super({ tag: 'div', classNames: ['address-block'] });
    this.streetBlock = new RegistrationFieldBlock(
      'Street',
      'text',
      'street',
      'Street',
    );
    this.cityBlock = new RegistrationFieldBlock('City', 'text', 'city', 'City');
    this.postalCodeBlock = new RegistrationFieldBlock(
      'Postal Code',
      'text',
      'postalCode',
      'Postal Code',
    );
    this.countryBlock = new RegistrationFieldBlock(
      'Country',
      'text',
      'country',
      'Country',
    );

    this.appendChildren([
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
