import { LoginEmail, LoginPassword } from '../interface/login_interface';

export function checkPassword(inputString: string): [boolean, LoginPassword] {
  let rightValue: boolean = true;
  const value = inputString;
  if (value.length === 0) {
    rightValue = false;
    return [rightValue, LoginPassword.EMPTY];
  }
  if (value.length < 8) {
    rightValue = false;
    return [rightValue, LoginPassword.LENGTH];
  }
  if (!/[A-Z]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginPassword.UPPERLETTER];
  }
  if (!/[a-z]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginPassword.LOWERLETTER];
  }
  if (!/[0-9]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginPassword.DIGIT];
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginPassword.SPECIAL];
  }
  if (/[ ]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginPassword.SPACE];
  }
  return [rightValue, LoginPassword.NULL];
}

export function checkEmail(inputString: string): [boolean, LoginEmail] {
  let rightValue: boolean = true;
  const value = inputString;
  if (value.length === 0) {
    rightValue = false;
    return [rightValue, LoginEmail.EMPTY];
  }
  if (/[ ]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginEmail.SPACE];
  }
  if (!/[@]/.test(value)) {
    rightValue = false;
    return [rightValue, LoginEmail.AT];
  }
  if (
    !/[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$/.test(value) ||
    value.match(/--/) ||
    value.match(/__/) ||
    value.startsWith('-') ||
    value.startsWith('_') ||
    !/^[a-z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(value) ||
    value.split('@')[1].startsWith('_') ||
    value.split('@')[1].startsWith('-')
  ) {
    rightValue = false;
    return [rightValue, LoginEmail.SAMPLE];
  }
  return [rightValue, LoginEmail.NULL];
}
