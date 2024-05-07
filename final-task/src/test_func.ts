export function sumNumbers(a: number, b: number): number {
  return a + b;
}

export function sumString(a: string, b: string): string {
  return a + b;
}

export interface TestCase {
  result: number[];
  expectedResult: number;
}

export interface TestCaseStr {
  result: string[];
  expectedResult: string;
}
