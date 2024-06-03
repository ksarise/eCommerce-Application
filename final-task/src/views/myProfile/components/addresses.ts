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
      'click',
      this.handleClickAddAddress,
    );
    this.createShippingBilling();
    this.createAddressesAll();
  }

  public createAddressesBlocks() {
    return [this.addressesAll, this.shippingBilling];
  }

  private createShippingBilling() {
    const imgProfile = tags.div(['img_edit']).getElement();
    const imgProfileShipping = tags.div(['img_edit']).getElement();
    const shippingH3 = tags.h3(['profile__header'], 'default Shipping');
    const billingH3 = tags.h3(['profile__header'], 'default Billing');
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
      id: `rubbish-${elem.id}`,
      title: 'Delete',
    });
    const edit = tags.button(['profile__edit'], '', {
      id: `edit-${elem.id}`,
      title: 'Edit',
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
      { id: `heading-${elem.id}` },
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
      if (key !== 'id' && key !== 'key') {
        const data = tags.div(['profile__data'], `${key}`).getElement();
        const info = tags
          .div(['profile__info'], `${value}`, { id: `${key}-${elem.id}` })
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
              id: `bill-${index}`,
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
              id: `bill-${index}`,
            },
          );
          this.defaultShipping.innerHTML = '';
          this.defaultShipping.append(billing);
        }
      });
    }
  }
}