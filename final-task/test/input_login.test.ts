import { checkEmail, checkPassword } from '../src/services/checkInput';
import { LoginEmail, LoginPassword } from '../src/global/enums/login';

const validEmails: string[] = [
  'user1@example.com',
  'user2@test.com',
  'use23r3@gmail.com',
  'user.ser4@domain.net',
  'user5@example.co',
  'user6@test.org',
  'user7@example.io',
  'user8@domain.com',
  'user9@test.xyz',
  'user10@example.com',
];
const invalidEmails: { email: string; error: string }[] = [
  { email: '', error: LoginEmail.EMPTY },
  { email: 'user@example.com ', error: LoginEmail.SPACE },
  { email: 'user @test.com', error: LoginEmail.SPACE },
  { email: 'user@example', error: LoginEmail.SAMPLE },
  { email: 'user@domain', error: LoginEmail.SAMPLE },
  { email: 'user@example.', error: LoginEmail.SAMPLE },
  { email: 'user@test.', error: LoginEmail.SAMPLE },
  { email: 'userdomain.', error: LoginEmail.AT },
  { email: 'user.example.com', error: LoginEmail.AT },
  { email: 'user@tes  tcom', error: LoginEmail.SPACE },
  { email: 'user@domain', error: LoginEmail.SAMPLE },
  { email: '  user@domain.com', error: LoginEmail.SPACE },
];
describe('test email', () => {
  validEmails.forEach((testCase, index) => {
    it(`should return true first test number ${index + 1}`, () => {
      const actualResult = checkEmail(testCase);
      expect(actualResult).toEqual([true, LoginEmail.NULL]);
    });
  });
  invalidEmails.forEach((testCase, index) => {
    it(`should return false second test number ${index + 1}`, () => {
      const actualResult = checkEmail(testCase.email);
      expect(actualResult).toEqual([false, testCase.error]);
    });
  });
});

const validPasswords = [
  'Password123!',
  'StrongP@ssw0rd11',
  'SecurePa11$$',
  'P@ssw0rd3',
  'MySecurePassword123!',
  'P@55w0rd!',
  '23ComplexP@ss',
  'P@$$w0rd345',
  'SecurePass123!',
  'SuperSecret123#',
  'P@sswor/d77!',
  'Secu%%rePassword23!',
  'StrongP66assword123!',
  'Passw0rd56!',
  'MyPassword123#',
];
const invalidPassword: { password: string; error: string }[] = [
  { password: '', error: LoginPassword.EMPTY },
  { password: 'MyPassword123# ', error: LoginPassword.SPACE },
  { password: 'Passw0rd56', error: LoginPassword.SPECIAL },
  { password: 'StrongPassword!', error: LoginPassword.DIGIT },
  { password: 'user@domain123', error: LoginPassword.UPPERLETTER },
  { password: 'DDDFFGJ1.', error: LoginPassword.LOWERLETTER },
  { password: '1234567', error: LoginPassword.LENGTH },
  { password: 'FFFFhfhf', error: LoginPassword.DIGIT },
  { password: '123 nM#yu', error: LoginPassword.SPACE },
  { password: 'Hello', error: LoginPassword.LENGTH },
  { password: 'ROCK12#F', error: LoginPassword.LOWERLETTER },
];
describe('test password', () => {
  validPasswords.forEach((testCase, index) => {
    it(`should return true first test number ${index + 1}`, () => {
      const actualResult = checkPassword(testCase);
      expect(actualResult).toEqual([true, LoginPassword.NULL]);
    });
  });
  invalidPassword.forEach((testCase, index) => {
    it(`should return false second test number ${index + 1}`, () => {
      const actualResult = checkPassword(testCase.password);
      expect(actualResult).toEqual([false, testCase.error]);
    });
  });
});
