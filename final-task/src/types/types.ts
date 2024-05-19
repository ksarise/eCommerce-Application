export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[] | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  eventCallback?: (event?: Event) => void;
}

export interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}
export type FieldEventCallback = (field: string, value: string) => void;
export type FormSubmitCallback = (formData: FormData) => void;
