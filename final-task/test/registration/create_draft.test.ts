import createCustomerDraft from '../../src/services/CreateCustomerDraft';
import {
  RegistrationFormData,
  CustomerDraft,
} from '../../src/global/interfaces/registration';

describe('createCustomerDraft', () => {
  it('should create a valid CustomerDraft when provided with valid RegistrationFormData', () => {
    const formData: RegistrationFormData = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
      shippinGstreet: '123 Joe St',
      shippinGcity: 'Brooklyn',
      shippinGpostalCode: '11201',
      shippinGcountry: 'USA',
      defaultBilling: true,
      defaultShipping: true,
      isSameAddress: false,
    };

    const expectedDraft: CustomerDraft = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      addresses: [
        {
          key: 'billingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'US',
        },
        {
          key: 'shippingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Joe St',
          city: 'Brooklyn',
          postalCode: '11201',
          country: 'US',
        },
      ],
      defaultBillingAddress: 0,
      defaultShippingAddress: 1,
      shippingAddressIds: ['1'],
      billingAddressIds: ['0'],
    };

    const result = createCustomerDraft(formData);
    expect(result).toEqual(expectedDraft);
  });

  it('should handle the case where billing and shipping addresses are the same', () => {
    const formData: RegistrationFormData = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
      shippinGstreet: '',
      shippinGcity: '',
      shippinGpostalCode: '',
      shippinGcountry: '',
      defaultBilling: true,
      defaultShipping: true,
      isSameAddress: true,
    };

    const expectedDraft: CustomerDraft = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      addresses: [
        {
          key: 'billingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'US',
        },
      ],
      defaultBillingAddress: 0,
      defaultShippingAddress: 0,
      shippingAddressIds: ['0'],
      billingAddressIds: ['0'],
    };

    const result = createCustomerDraft(formData);
    expect(result).toEqual(expectedDraft);
  });

  it('should handle the case where country is Canada', () => {
    const formData: RegistrationFormData = {
      email: 'test@example.ca',
      password: 'Password123!',
      firstName: 'Jane',
      lastName: 'Doe',
      dob: '1985-05-05',
      street: '456 Maple St',
      city: 'Toronto',
      postalCode: 'M5H 2N2',
      country: 'Canada',
      shippinGstreet: '789 Oak St',
      shippinGcity: 'Vancouver',
      shippinGpostalCode: 'V6B 1A1',
      shippinGcountry: 'Canada',
      defaultBilling: false,
      defaultShipping: true,
      isSameAddress: false,
    };

    const expectedDraft: CustomerDraft = {
      email: 'test@example.ca',
      password: 'Password123!',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1985-05-05',
      addresses: [
        {
          key: 'billingAddress',
          firstName: 'Jane',
          lastName: 'Doe',
          streetName: '456 Maple St',
          city: 'Toronto',
          postalCode: 'M5H 2N2',
          country: 'CA',
        },
        {
          key: 'shippingAddress',
          firstName: 'Jane',
          lastName: 'Doe',
          streetName: '789 Oak St',
          city: 'Vancouver',
          postalCode: 'V6B 1A1',
          country: 'CA',
        },
      ],
      defaultBillingAddress: undefined,
      defaultShippingAddress: 1,
      shippingAddressIds: ['1'],
      billingAddressIds: ['0'],
    };

    const result = createCustomerDraft(formData);
    expect(result).toEqual(expectedDraft);
  });
  it('should set shipping country code to US when an invalid country is provided', () => {
    const formData: RegistrationFormData = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'InvalidCountry',
      shippinGstreet: '123 Elm St',
      shippinGcity: 'Brooklyn',
      shippinGpostalCode: '11201',
      shippinGcountry: 'InvalidCountry',
      defaultBilling: true,
      defaultShipping: false,
      isSameAddress: false,
    };

    const expectedDraft: CustomerDraft = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      addresses: [
        {
          key: 'billingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'US',
        },
        {
          key: 'shippingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Elm St',
          city: 'Brooklyn',
          postalCode: '11201',
          country: 'US',
        },
      ],
      defaultBillingAddress: 0,
      defaultShippingAddress: undefined,
      shippingAddressIds: ['1'],
      billingAddressIds: ['0'],
    };

    const result = createCustomerDraft(formData);
    expect(result).toEqual(expectedDraft);
  });

  it('should set defaultShippingAddress to undefined when defaultShipping is false', () => {
    const formData: RegistrationFormData = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
      shippinGstreet: '123 Elm St',
      shippinGcity: 'Brooklyn',
      shippinGpostalCode: '11201',
      shippinGcountry: 'USA',
      defaultBilling: true,
      defaultShipping: false,
      isSameAddress: false,
    };

    const expectedDraft: CustomerDraft = {
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      addresses: [
        {
          key: 'billingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'US',
        },
        {
          key: 'shippingAddress',
          firstName: 'John',
          lastName: 'Doe',
          streetName: '123 Elm St',
          city: 'Brooklyn',
          postalCode: '11201',
          country: 'US',
        },
      ],
      defaultBillingAddress: 0,
      defaultShippingAddress: undefined,
      shippingAddressIds: ['1'],
      billingAddressIds: ['0'],
    };

    const result = createCustomerDraft(formData);
    expect(result).toEqual(expectedDraft);
  });
});
