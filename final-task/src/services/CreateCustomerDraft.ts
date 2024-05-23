import { RegistrationFormData, Address, CustomerDraft } from '../types/types';

export default function createCustomerDraft(
  formData: RegistrationFormData,
): CustomerDraft {
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

  let countryCode;
  if (country === 'USA') {
    countryCode = 'US';
  } else if (country === 'Canada') {
    countryCode = 'CA';
  } else {
    countryCode = 'US';
  }
  const billingAddress: Address = {
    key: 'billingAddress',
    firstName,
    lastName,
    streetName: street,
    city,
    postalCode: postalCode.toUpperCase(),
    country: countryCode,
  };

  let shippinGcountryCode;
  if (shippinGcountry === 'USA') {
    shippinGcountryCode = 'US';
  } else if (country === 'Canada') {
    shippinGcountryCode = 'CA';
  } else {
    shippinGcountryCode = 'US';
  }
  const shippingAddress: Address = isSameAddress
    ? billingAddress
    : {
        key: 'shippingAddress',
        firstName,
        lastName,
        streetName: shippinGstreet,
        city: shippinGcity,
        postalCode: shippinGpostalCode.toUpperCase(),
        country: shippinGcountryCode,
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
