import BaseComponentGenerator from './base-component';

const div = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLDivElement => {
  return new BaseComponentGenerator({
    tag: 'div',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLDivElement;
};

const h1 = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLHeadingElement => {
  return new BaseComponentGenerator({
    tag: 'h1',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLHeadingElement;
};

const h2 = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLHeadingElement => {
  return new BaseComponentGenerator({
    tag: 'h2',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLHeadingElement;
};

const h3 = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLHeadingElement => {
  return new BaseComponentGenerator({
    tag: 'h3',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLHeadingElement;
};

const img = (
  classNames: string[],
  attributes: { [key: string]: string },
): HTMLImageElement => {
  return new BaseComponentGenerator({
    tag: 'img',
    classNames,
    attributes,
  }).getElement() as HTMLImageElement;
};

const a = (
  classNames: string[],
  href: string,
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLLinkElement => {
  return new BaseComponentGenerator({
    tag: 'a',
    classNames,
    content,
    attributes: { ...attributes, href },
  }).getElement() as HTMLLinkElement;
};

const p = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLParagraphElement => {
  return new BaseComponentGenerator({
    tag: 'p',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLParagraphElement;
};

const ul = (
  classNames: string[],
  attributes: { [key: string]: string } = {},
): HTMLUListElement => {
  return new BaseComponentGenerator({
    tag: 'ul',
    classNames,
    attributes,
  }).getElement() as HTMLUListElement;
};

const li = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLLIElement => {
  return new BaseComponentGenerator({
    tag: 'li',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLLIElement;
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

const form = (
  classNames: string[],
  attributes: { [key: string]: string } = {},
): HTMLFormElement => {
  return new BaseComponentGenerator({
    tag: 'form',
    classNames,
    attributes,
  }).getElement() as HTMLFormElement;
};
const label = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLLabelElement => {
  return new BaseComponentGenerator({
    tag: 'label',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLLabelElement;
};

const button = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
  event?: string,
  eventCallback?: (event?: Event) => void,
): HTMLButtonElement => {
  return new BaseComponentGenerator({
    tag: 'button',
    classNames,
    content,
    attributes,
    event,
    eventCallback,
  }).getElement() as HTMLButtonElement;
};

const tags = {
  div,
  h1,
  h2,
  h3,
  img,
  a,
  p,
  ul,
  li,
  input,
  form,
  label,
  button,
};

export default tags;
