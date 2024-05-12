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

const h1 = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'h1',
    classNames,
    content,
    attributes,
  }).getElement();
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

const h3 = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'h3',
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

const input = (
  classNames: string[],
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'input',
    classNames,
    attributes,
  });
};

const form = (
  classNames: string[],
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'form',
    classNames,
    attributes,
  });
};
const label = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'label',
    classNames,
    content,
    attributes,
  });
};

const button = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): BaseComponentGenerator => {
  return new BaseComponentGenerator({
    tag: 'button',
    classNames,
    content,
    attributes,
  });
};

const tags = { div, h1, h2, h3, img, a, p, ul, li, input, form, label, button };
export default tags;
