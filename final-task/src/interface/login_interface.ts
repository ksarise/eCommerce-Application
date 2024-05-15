export enum LoginEmail {
  EMPTY = 'Please fill in the field',
  AT = 'Email should contain an "@" symbol separating local part and domain name',
  SPACE = 'Email should not contain leading or trailing whitespace',
  SAMPLE = 'Email should be properly formatted (e.g., user@example.com)',
}

export enum LoginPassword {
  EMPTY = 'Please fill in the field',
  LENGTH = 'Password should be at least 8 characters long',
  UPPERLETTER = 'Password should contain at least one uppercase letter ',
  LOWERLETTER = 'Password should contain at least one lowercase letter',
  SPACE = 'Password should not contain leading or trailing whitespace',
  DIGIT = 'Password should contain at least one digit',
  SPECIAL = 'Password should contain at least one special character (e.g., !@#$%^&*)',
}
