import { Address } from '@commercetools/platform-sdk';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import tags from '../../../tags/tags';

export default class Addresses {
  public defaultShipping: HTMLElement;

  public defaultBilling: HTMLElement;

  public addressesAll: HTMLElement;

  public shippingBilling: HTMLElement;

  public buttonAdd: HTMLElement;

  public handleClickAddAddress: ((event?: Event) => void) | undefined;

  public handleClickEditAddress: (() => void) | undefined;

  public handleClickEditBilling: (() => void) | undefined;

  public handleClickEditShipping: (() => void) | undefined;

  public handleClickRemoveAddress: (() => void) | undefined;

  constructor() {
    this.defaultShipping = tags.div(['profile__shipping']).getElement();
    this.defaultBilling = tags.div(['profile__billing']).getElement();
    this.addressesAll = tags
      .div(['profile__all', 'profile__block'])
      .getElement();
    this.shippingBilling = tags
      .div(['profile__shippingBilling', 'profile__block'])
      .getElement();
    this.buttonAdd = tags.button(
      ['profile__add', 'profile__button_add'],
      'Add',
      {},
    );
    this.buttonAdd.addEventListener('click', () => {
      if (this.handleClickAddAddress) this.handleClickAddAddress();
    });
    this.createShippingBilling();
    this.createAddressesAll();
  }

  public createAddressesBlocks() {
    return [this.addressesAll, this.shippingBilling];
  }

  private createShippingBilling() {
    const imgProfile = tags.div(['img_edit']).getElement();
    const imgProfileShipping = tags.div(['img_edit']).getElement();
    const shippingH3 = tags.h3(['profile__header'], 'Default Shipping');
    const billingH3 = tags.h3(['profile__header'], 'Default Billing');
    const buttonEditBilling = tags.button(
      ['profile__edit', 'profile__button_billing'],
      'Edit',
      { title: 'Edit' },
    );
    const buttonEditShipping = tags.button(
      ['profile__edit', 'profile__button_shipping'],
      'Edit',
      { title: 'Edit' },
    );
    buttonEditBilling.addEventListener('click', () => {
      if (this.handleClickEditBilling) this.handleClickEditBilling();
    });
    buttonEditShipping.addEventListener('click', () => {
      if (this.handleClickEditShipping) this.handleClickEditShipping();
    });
    buttonEditBilling.prepend(imgProfile);
    buttonEditShipping.prepend(imgProfileShipping);
    shippingH3.append(buttonEditShipping);
    billingH3.append(buttonEditBilling);
    this.shippingBilling.append(
      shippingH3,
      this.defaultShipping,
      billingH3,
      this.defaultBilling,
    );
  }

  private createAddressesAll() {
    const profileH2 = tags.h2(['profile__header'], 'Addresses');
    profileH2.append(this.buttonAdd);
    this.addressesAll.append(profileH2);
  }

  public changeAddresses(body: Customer) {
    this.addressesAll.innerHTML = '';
    this.createAddressesAll();
    const { addresses } = body;
    addresses.forEach((elem) => {
      this.createAddressOne(elem);
    });
  }

  private createAddressOne(elem: Address) {
    const rubbish = tags.button(['profile__rubbish'], '', {
      id: `rubbish__${elem.id}`,
      title: 'Delete',
    });
    const edit = tags.button(['profile__edit'], '', {
      id: `edit__${elem.id}`,
      title: 'Edit',
    });
    edit.addEventListener('click', () => {
      this.addressesAll.id = `address__${elem.id}`;
      if (this.handleClickEditAddress) this.handleClickEditAddress();
    });
    rubbish.addEventListener('click', () => {
      this.addressesAll.id = `address__${elem.id}`;
      if (this.handleClickRemoveAddress) this.handleClickRemoveAddress();
    });
    const imgRubbish = tags.div(['img_rubbish']).getElement();
    const imgEdit = tags.div(['img_edit']).getElement();
    rubbish.append(imgRubbish);
    edit.append(imgEdit);
    const block = tags
      .div(['profile__address_block', 'profile__address_hidden'], '', {
        id: `${elem.id}`,
      })
      .getElement();
    const header = tags.p(
      ['addresses__header'],
      `${elem.country} ${elem.city} ${elem.streetName}`,
      { id: `heading__${elem.id}` },
    );
    header.append(edit, rubbish);
    const buttonLine = tags.button(['profile__line'], '', {
      title: 'More information',
    });
    buttonLine.addEventListener('click', () => {
      block.classList.toggle('profile__address_hidden');
    });
    const blockAddress = tags.div(['address']).getElement();
    const keys = Object.entries(elem);
    keys.forEach(([key, value]) => {
      if (
        key !== 'id' &&
        key !== 'key' &&
        key !== 'firstName' &&
        key !== 'lastName'
      ) {
        const data = tags.div(['profile__data'], `${key}`).getElement();
        const info = tags
          .div(['profile__info'], `${value}`, { id: `${key}__${elem.id}` })
          .getElement();
        blockAddress.append(data, info);
      }
    });
    header.append(buttonLine);
    block.append(header, blockAddress);
    this.addressesAll.append(block);
  }

  public defaultAddresses(body: Customer) {
    const address = body.addresses;
    if (body.defaultBillingAddressId) {
      const index = body.defaultBillingAddressId;
      address.forEach((elem) => {
        if (elem.id === index) {
          const billing = tags.p(
            ['addresses__header_bill'],
            `${elem.country} ${elem.city} ${elem.streetName}`,
            {
              id: `bill__${index}`,
            },
          );
          this.defaultBilling.innerHTML = '';
          this.defaultBilling.append(billing);
        }
      });
    }

    if (body.defaultShippingAddressId) {
      const index = body.defaultShippingAddressId;
      address.forEach((elem) => {
        if (elem.id === index) {
          const billing = tags.p(
            ['addresses__header_ship'],
            `${elem.country} ${elem.city} ${elem.streetName}`,
            {
              id: `ship__${index}`,
            },
          );
          this.defaultShipping.innerHTML = '';
          this.defaultShipping.append(billing);
        }
      });
    }
  }
}
