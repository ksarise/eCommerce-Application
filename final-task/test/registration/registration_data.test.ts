import { RegistrationFormData } from '../../src/global/interfaces/registration';
import RegistrationPageModel from '../../src/models/Registration/RegistrationModel';
import * as validationRules from '../../src/models/Registration/validation/validationRules.json';

const validations = JSON.parse(JSON.stringify(validationRules));
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
  { email: '', error: validations.email.errorMessage },
  { email: 'user@example', error: validations.email.errorMessage },
  { email: 'user@domain', error: validations.email.errorMessage },
  { email: 'user.example.com', error: validations.email.errorMessage },
];

const validPasswords = [
  'Password123!',
  'StrongP@ssw0rd11',
  'SecurePa11$$',
  'P@ssw0rd3',
  'MySecurePassword123!',
];
const invalidPasswords: { password: string; errors: string[] }[] = [
  { password: '', errors: [validations.password.errorMessages.minLength] },
  {
    password: 'password123!',
    errors: [validations.password.errorMessages.uppercase],
  },
  {
    password: 'PASSWORD123!',
    errors: [validations.password.errorMessages.lowercase],
  },
  {
    password: 'Password!',
    errors: [validations.password.errorMessages.number],
  },
  {
    password: 'Password123',
    errors: [validations.password.errorMessages.specialCharacter],
  },
  {
    password: 'Pass word  123!  ',
    errors: [validations.password.errorMessages.noSpace],
  },
];

const validNames = ['John', 'Alice', 'Bruce'];
const invalidNames: { name: string; errors: string[] }[] = [
  {
    name: '',
    errors: [validations.name.errorMessages.minLength],
  },
  {
    name: 'john',
    errors: [validations.name.errorMessages.firstCapital],
  },
  {
    name: 'J0hn',
    errors: [validations.name.errorMessages.pattern],
  },
];
const validDOBs: string[] = ['2000-01-01', '1990-01-01'];

const invalidDOBs: { dob: string; errors: string[] }[] = [
  {
    dob: '2023-01-01',
    errors: ['You must be at least 13 years old'],
  },
  {
    dob: '1890-01-01',
    errors: ['You are too old for it! Year must be 1900 or later.'],
  },
  {
    dob: 'invalidDate',
    errors: ['Invalid date. Please enter a valid date.'],
  },
];

describe('RegistrationPageModel Validation', () => {
  let model: RegistrationPageModel;

  beforeEach(() => {
    model = new RegistrationPageModel();
  });

  describe('Email Validation', () => {
    validEmails.forEach((email, index) => {
      it(`should validate correct email ${index + 1}`, () => {
        model.validateEmail(email);
        expect(model.errors.email).toBeUndefined();
      });
    });

    invalidEmails.forEach(({ email, error }, index) => {
      it(`should invalidate incorrect email ${index + 1}`, () => {
        model.validateEmail(email);
        expect(model.errors.email).toContain(error);
      });
    });
  });

  describe('Password Validation', () => {
    validPasswords.forEach((password, index) => {
      it(`should validate correct password ${index + 1}`, () => {
        model.validatePassword(password);
        expect(model.errors.password).toBeUndefined();
      });
    });

    invalidPasswords.forEach(({ password, errors }, index) => {
      it(`should invalidate incorrect password ${index + 1}`, () => {
        model.validatePassword(password);
        // expect(model.errors.password).toBeDefined();
        errors.forEach((error) => {
          expect(model.errors.password).toContain(error);
        });
      });
    });
  });

  describe('Name Validation', () => {
    validNames.forEach((name, index) => {
      it(`should validate correct name ${index + 1}`, () => {
        model.validateName(name, 'firstName');
        expect(model.errors.firstName).toBeUndefined();
      });
    });

    invalidNames.forEach(({ name, errors }, index) => {
      it(`should invalidate incorrect name ${index + 1}`, () => {
        model.validateName(name, 'firstName');
        errors.forEach((error) => {
          expect(model.errors.firstName).toContain(error);
        });
      });
    });
  });
  describe('DOB Validation', () => {
    validDOBs.forEach((dob, index) => {
      it(`should validate correct date of birth ${index + 1}`, () => {
        model.validateDOB(dob);
        expect(model.errors.dob).toBeUndefined();
      });
    });

    invalidDOBs.forEach(({ dob, errors }, index) => {
      it(`should invalidate incorrect date of birth ${index + 1}`, () => {
        model.validateDOB(dob);
        expect(model.errors.dob).toBeDefined();
        errors.forEach((error) => {
          expect(model.errors.dob).toContain(error);
        });
      });
    });
  });
  describe('Age calculation', () => {
    it('should adjust age if birth month is after current month', () => {
      const futureBirthDate = new Date('2024-06-01');

      model.validateDOB(futureBirthDate.toISOString());

      expect(model.errors.dob).toContain('You must be at least 13 years old');
    });

    it('should adjust age if birth month is current month but birth day is after current day', () => {
      const sameMonthFutureBirthDate = new Date('2024-05-10');

      model.validateDOB(sameMonthFutureBirthDate.toISOString());

      expect(model.errors.dob).toContain('You must be at least 13 years old');
    });
  });

  describe('Street Validation', () => {
    const validStreets: string[] = ['123 Main St'];

    const invalidStreets: { street: string; errors: string[] }[] = [
      {
        street: '',
        errors: ['Street must be at least one character long'],
      },
    ];
    validStreets.forEach((street, index) => {
      it(`should validate correct street ${index + 1}`, () => {
        model.validateStreet(street, 'street');
        expect(model.errors.street).toBeUndefined();
      });
    });

    invalidStreets.forEach(({ street, errors }, index) => {
      it(`should invalidate incorrect street ${index + 1}`, () => {
        model.validateStreet(street, 'street');
        expect(model.errors.street).toBeDefined();
        errors.forEach((error) => {
          expect(model.errors.street).toContain(error);
        });
      });
    });
  });
  describe('Postal Code Validation', () => {
    const validPostalCodesUSA = ['12345'];
    const validPostalCodesCanada = ['A1A 1A1'];
    const invalidPostalCodesUSA = [
      '',
      '54321A',
      '123456',
      'A1A1A1',
      'Special!@#',
    ];

    const invalidPostalCodesCanada = [
      '',
      '54321A',
      '123456',
      '12345',
      'Special!@#',
    ];

    validPostalCodesUSA.forEach((postalCode, index) => {
      it(`should validate correct postal code for USA ${index + 1}`, () => {
        model.validatePostalCode(postalCode, 'USA', 'postalCode');
        expect(model.errors.postalCode).toBeUndefined();
      });
    });

    validPostalCodesCanada.forEach((postalCode, index) => {
      it(`should validate correct postal code for Canada ${index + 1}`, () => {
        model.validatePostalCode(postalCode, 'Canada', 'postalCode');
        expect(model.errors.postalCode).toBeUndefined();
      });
    });

    invalidPostalCodesUSA.forEach((postalCode, index) => {
      it(`should invalidate incorrect postal code ${index + 1}`, () => {
        model.validatePostalCode(postalCode, 'USA', 'postalCode');
        expect(model.errors.postalCode).toContain(
          'Postal code of USA must be 5 digits',
        );
      });
    });

    invalidPostalCodesCanada.forEach((postalCode, index) => {
      it(`should invalidate incorrect postal code ${index + 1}`, () => {
        model.validatePostalCode(postalCode, 'Canada', 'postalCode');
        expect(model.errors.postalCode).toContain(
          'Postal code of Canada must be in the format A1A 1A1',
        );
      });
    });
  });

  describe('Country Validation', () => {
    const validCountries = ['USA', 'Canada'];
    const invalidCountry = 'Mexico';

    validCountries.forEach((country, index) => {
      it(`should validate correct country ${index + 1}`, () => {
        model.validateCountry(country, validCountries, 'country');
        expect(model.errors.country).toBeUndefined();
      });
    });

    it('should invalidate incorrect country', () => {
      model.validateCountry(invalidCountry, validCountries, 'country');
      expect(model.errors.country).toContain(
        'Sorry, we only accept users from the USA or Canada',
      );
    });
  });
  describe('City Validation', () => {
    const validCities: string[] = [
      'New York',
      'Los Angeles',
      'London',
      'paris',
    ];
    const invalidCities: { city: string; errors: string[] }[] = [
      { city: '', errors: ['City must be at least one character long'] },
      { city: '12345', errors: ['City must contain only english letters'] },
      {
        city: 'Special!@#',
        errors: ['City must contain only english letters'],
      },
      { city: 'вологда', errors: ['City must contain only english letters'] },
    ];

    validCities.forEach((city, index) => {
      it(`should validate correct city ${index + 1}`, () => {
        model.validateCity(city, 'city');
        expect(model.errors.city).toBeUndefined();
      });
    });
    invalidCities.forEach(({ city, errors }, index) => {
      it(`should invalidate incorrect city ${index + 1}`, () => {
        model.validateCity(city, 'city');
        expect(model.errors.city).toBeDefined();
        errors.forEach((error) => {
          expect(model.errors.city).toContain(error);
        });
      });
    });
  });

  describe('Postal Code Validation', () => {
    it('should invalidate when no country selected', () => {
      const postalCode = '12345';
      const country = '';
      const field = 'postalCode';

      model.validatePostalCode(postalCode, country, field);

      expect(model.errors[field]).toContain(
        'Please select a valid country before entering a postal code.',
      );
    });
  });

  describe('Valid country selection', () => {
    it('should invalidate invalid country', () => {
      const postalCode = '12345';
      const country = 'Mexico';
      const field = 'postalCode';

      model.validatePostalCode(postalCode, country, field);

      expect(model.errors[field]).toContain('Please select a valid country.');
    });
  });

  describe('Registration Form Validation', () => {
    type TestData = {
      data: RegistrationFormData;
      expectedErrors: { [key: string]: string[] };
    };
    const testData: TestData[] = [
      {
        data: {
          email: 'test@example.com',
          password: 'Password123!',
          firstName: 'John',
          lastName: 'Doe',
          dob: '1990-01-01',
          street: '123 Main St',
          city: 'New York',
          postalCode: '12345',
          country: 'USA',
          shippinGstreet: '456 Elm St',
          shippinGcity: 'Los Angeles',
          shippinGpostalCode: '67890',
          shippinGcountry: 'Canada',
          defaultBilling: true,
          defaultShipping: true,
          isSameAddress: true,
        },
        expectedErrors: {
          shippinGpostalCode: [
            'Postal code of Canada must be in the format A1A 1A1',
          ],
        },
      },
      {
        data: {
          email: 'invalid-email',
          password: 'short',
          firstName: '',
          lastName: 'doe',
          dob: '2005-01-01',
          street: '123 Main St',
          city: 'New York',
          postalCode: '123456',
          country: 'France',
          shippinGstreet: '456 Elm St',
          shippinGcity: 'Los Angeles',
          shippinGpostalCode: '6789',
          shippinGcountry: 'USA',
          defaultBilling: true,
          defaultShipping: true,
          isSameAddress: true,
        },
        expectedErrors: {
          country: ['Sorry, we only accept users from the USA or Canada'],
          email: ['Invalid email address'],
          password: [
            'Password must be at least 8 characters long',
            'Password must contain at least one uppercase letter',
            'Password must contain at least one number',
            'Password must contain at least one special character',
          ],
          firstName: [
            'Name must contain only english letters',
            'Name must be at least one character long',
            'Name must start with a capital letter',
          ],
          lastName: ['Name must start with a capital letter'],
          postalCode: ['Please select a valid country.'],
          shippinGpostalCode: ['Postal code of USA must be 5 digits'],
        },
      },
    ];

    testData.forEach(({ data, expectedErrors }, index) => {
      it(`should validate all fields for test ${index + 1}`, () => {
        model.validateForm(data);
        expect(model.errors).toEqual(expectedErrors);
      });
    });
  });
});
