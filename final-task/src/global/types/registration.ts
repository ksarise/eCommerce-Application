import { RegistrationFormData } from '../interfaces/registration';

export type FieldEventCallback = (field: string, value: string) => void;
export type FormSubmitCallback = (formData: RegistrationFormData) => void;
