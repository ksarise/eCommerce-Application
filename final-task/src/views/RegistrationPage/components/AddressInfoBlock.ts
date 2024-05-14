import tags from '../../../components/tags';
import RegistrationFieldBlock from './RegistrationFieldBlock';

export default class AddressBlock {
  private AddressBlock: HTMLElement;

  private streetBlock: HTMLElement;

  private cityBlock: HTMLElement;

  private postalCodeBlock: HTMLElement;

  private countryBlock: HTMLElement;

  constructor() {
    this.streetBlock = new RegistrationFieldBlock(
      'Street',
      'text',
      () => {},
    ).getBlock();
    this.cityBlock = new RegistrationFieldBlock(
      'City',
      'text',
      () => {},
    ).getBlock();
    this.postalCodeBlock = new RegistrationFieldBlock(
      'Postal code',
      'text',
      () => {},
    ).getBlock();
    this.countryBlock = new RegistrationFieldBlock(
      'Country',
      'text',
      () => {},
    ).getBlock();
    const addressContainer = tags.div(['registration__address-container']);
    addressContainer.appendChildren([
      this.streetBlock,
      this.cityBlock,
      this.postalCodeBlock,
      this.countryBlock,
    ]);
    this.AddressBlock = addressContainer.getElement();
  }

  public getElement() {
    return this.AddressBlock;
  }
}
