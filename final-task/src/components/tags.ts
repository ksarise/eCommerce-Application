import BaseComponentGenerator from './base-component';

const div = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'div',
    classNames,
    content,
    attributes,
  });
};

const input = (
  classNames: string[],
  attributes: { [key: string]: string } = {},
): HTMLInputElement => {
  return new BaseComponentGenerator({
    tag: 'input',
    classNames,
    attributes,
  }).getElement() as HTMLInputElement;
};

const fieldset = (classNames: string[]): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'fieldset',
    classNames,
  });
};

const h2 = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'h2',
    classNames,
    content,
    attributes,
  }).getElement();
};

const img = (
  classNames: string[],
  attributes: { [key: string]: string },
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'img',
    classNames,
    attributes,
  }).getElement();
};

const a = (
  classNames: string[],
  href: string,
  content?: string,
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'a',
    classNames,
    content,
    attributes: { ...attributes, href },
  });
};

const p = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'p',
    classNames,
    content,
    attributes,
  });
};

const ul = (
  classNames: string[],
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'ul',
    classNames,
    attributes,
  });
};

const li = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'li',
    classNames,
    content,
    attributes,
  });
};

const button = (
  classNames: string[],
  content: string,
  attributes: { [key: string]: string } = {},
  eventCallback: (event?: Event) => void = () => {},
): HTMLButtonElement => {
  return new BaseComponentGenerator({
    tag: 'button',
    classNames,
    content,
    attributes,
    event: 'click',
    eventCallback,
  }).getElement() as HTMLButtonElement;
};

const legend = (
  classNames: string[],
  content: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'legend',
    classNames,
    content,
    attributes,
  }).getElement();
};
const span = (classNames: string[]): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'span',
    classNames,
  }).getElement();
};
const tags = {
  div,
  input,
  fieldset,
  h2,
  img,
  a,
  p,
  ul,
  li,
  button,
  legend,
  span,
};
export default tags;
