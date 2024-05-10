import * as tasks from '../src/test_func';

const testCases: tasks.TestCase[] = [
  { result: [3, 5], expectedResult: 8 },
  { result: [3, -5], expectedResult: -2 },
  { result: [-3, -5], expectedResult: -8 },
  { result: [3, 0], expectedResult: 3 },
  { result: [0, 0], expectedResult: 0 },
];

const testStr: tasks.TestCaseStr[] = [
  { result: ['w', 'w'], expectedResult: 'ww' },
  { result: ['c', 'c'], expectedResult: 'cc' },
  { result: ['b', 'b'], expectedResult: 'bb' },
  { result: ['ee', 'ee'], expectedResult: 'eeee' },
  { result: ['fff', 'fff'], expectedResult: 'ffffff' },
];

describe('sum function', () => {
  testCases.forEach((testCase, index) => {
    it(`should return the correct sum for test case ${index + 1}`, () => {
      const { result, expectedResult } = testCase;
      const [a, b] = result;
      const actualResult = tasks.sumNumbers(a, b);
      expect(actualResult).toBe(expectedResult);
    });
  });
});

describe('sum string', () => {
  testStr.forEach((testCase, index) => {
    it(`should return the correct string ${index + 1}`, () => {
      const { result, expectedResult } = testCase;
      const [a, b] = result;
      const actualResult = tasks.sumString(a, b);
      expect(actualResult).toBe(expectedResult);
    });
  });
});
