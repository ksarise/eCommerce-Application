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

const span = (classNames: string[], content?: string): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'span',
    classNames,
    content,
  }).getElement();
};

const select = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'select',
    classNames,
    content,
    attributes,
  }).getElement();
};

const option = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'option',
    classNames,
    content,
    attributes,
  }).getElement();
};

const section = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  return new BaseComponentGenerator({
    tag: 'section',
    classNames,
    content,
    attributes,
  }).getElement();
};
const table = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLTableElement => {
  return new BaseComponentGenerator({
    tag: 'table',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLTableElement;
};
const thead = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLTableSectionElement => {
  return new BaseComponentGenerator({
    tag: 'thead',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLTableSectionElement;
};

const tbody = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLTableSectionElement => {
  return new BaseComponentGenerator({
    tag: 'tbody',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLTableSectionElement;
};
const tr = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLTableRowElement => {
  return new BaseComponentGenerator({
    tag: 'tr',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLTableRowElement;
};
const td = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLTableCellElement => {
  return new BaseComponentGenerator({
    tag: 'td',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLTableCellElement;
};
const th = (
  classNames: string[],
  content?: string,
  attributes: { [key: string]: string } = {},
): HTMLTableCellElement => {
  return new BaseComponentGenerator({
    tag: 'th',
    classNames,
    content,
    attributes,
  }).getElement() as HTMLTableCellElement;
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
  span,
  select,
  option,
  section,
  table,
  thead,
  tbody,
  tr,
  td,
  th,
};

export default tags;
