import { FormData, Address, CustomerDraft } from '../../../types/types';

export default function createCustomerDraft(formData: FormData): CustomerDraft {
  const {
    email,
    password,
    firstName,
    lastName,
    dob,
    street,
    city,
    postalCode,
    country,
    shippinGstreet,
    shippinGcity,
    shippinGpostalCode,
    shippinGcountry,
    defaultBilling,
    defaultShipping,
    isSameAddress,
  } = formData;

  const billingAddress: Address = {
    key: 'billingAddress',
    firstName,
    lastName,
    streetName: street,
    city,
    postalCode,
    country: country.slice(0, 2),
  };

  const shippingAddress: Address = isSameAddress
    ? billingAddress
    : {
        key: 'shippingAddress',
        firstName,
        lastName,
        streetName: shippinGstreet,
        city: shippinGcity,
        postalCode: shippinGpostalCode,
        country: shippinGcountry.slice(0, 2),
      };

  const addresses: Address[] = [billingAddress];
  if (!isSameAddress) {
    addresses.push(shippingAddress);
  }

  const shippingAddressIds = isSameAddress ? ['0'] : ['1'];
  const billingAddressIds = isSameAddress ? ['0'] : ['0'];

  let defaultShippingAddress;
  if (defaultShipping) {
    if (isSameAddress) {
      defaultShippingAddress = 0;
    } else {
      defaultShippingAddress = 1;
    }
  } else {
    defaultShippingAddress = undefined;
  }
  const customerDraft: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth: dob,
    addresses,
    shippingAddressIds,
    billingAddressIds,
    defaultBillingAddress: defaultBilling ? 0 : undefined,
    defaultShippingAddress:
      defaultShippingAddress !== undefined ? defaultShippingAddress : undefined,
  };

  return customerDraft;
}
