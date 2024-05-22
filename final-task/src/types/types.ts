export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[] | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  eventCallback?: (event?: Event) => void;
}

export interface RegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  shippinGstreet: string;
  shippinGcity: string;
  shippinGpostalCode: string;
  shippinGcountry: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
  isSameAddress: boolean;
}
export type FieldEventCallback = (field: string, value: string) => void;
export type FormSubmitCallback = (formData: RegistrationFormData) => void;
export interface Address {
  key: string;
  firstName: string;
  lastName: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

export interface ApiResponse {
  body: {
    customer: {
      id: string;
    };
  };
}
