import BaseComponentGenerator from '../../src/tags/base-component';
import { ElementProps } from '../../src/global/interfaces/elementProps';
describe('BaseComponentGenerator', () => {
  let props: ElementProps;

  beforeEach(() => {
    props = {
      tag: 'div',
      classNames: ['test-class'],
      content: 'Test Content',
      attributes: { id: 'test-id', 'data-test': 'test-data' },
      event: 'click',
      eventCallback: jest.fn(),
    };
  });

  it('should create an element with the correct properties', () => {
    const component = new BaseComponentGenerator(props);
    const element = component.getElement();
    expect(element.tagName).toBe('DIV');
    expect(element.classList.contains('test-class')).toBe(true);
    expect(element.textContent).toBe('Test Content');
    expect(element.getAttribute('id')).toBe('test-id');
    expect(element.getAttribute('data-test')).toBe('test-data');
    element.click();
    expect(props.eventCallback).toHaveBeenCalled();
  });

  it('should append a child element correctly', () => {
    const parentComponent = new BaseComponentGenerator(props);
    const childProps: ElementProps = {
      tag: 'span',
      content: 'Child Content',
    };
    const childComponent = new BaseComponentGenerator(childProps);
    parentComponent.appendChild(childComponent);
    const parentElement = parentComponent.getElement();
    const childElement = parentElement.querySelector('span');
    expect(childElement).not.toBeNull();
    expect(childElement?.textContent).toBe('Child Content');
  });

  it('should append multiple children correctly', () => {
    const parentComponent = new BaseComponentGenerator(props);
    const childProps1: ElementProps = {
      tag: 'span',
      content: 'Child 1',
    };
    const childProps2: ElementProps = {
      tag: 'span',
      content: 'Child 2',
    };
    const childComponent1 = new BaseComponentGenerator(childProps1);
    const childComponent2 = new BaseComponentGenerator(childProps2);
    parentComponent.appendChildren([childComponent1, childComponent2]);
    const parentElement = parentComponent.getElement();
    const children = parentElement.querySelectorAll('span');
    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe('Child 1');
    expect(children[1].textContent).toBe('Child 2');
  });

  it('should handle appending a plain HTMLElement', () => {
    const parentComponent = new BaseComponentGenerator(props);
    const childElement = document.createElement('span');
    childElement.textContent = 'Plain Child';
    parentComponent.appendChild(childElement);
    const parentElement = parentComponent.getElement();
    const appendedChild = parentElement.querySelector('span');
    expect(appendedChild).not.toBeNull();
    expect(appendedChild?.textContent).toBe('Plain Child');
  });

  it('should handle case where element is null in appendChild', () => {
    const props: ElementProps = { tag: 'div' };
    const generator = new BaseComponentGenerator(props);
    (generator as any).element = null;

    expect(() => {
      generator.appendChild(document.createElement('span'));
    }).not.toThrow();
  });

  it('should handle case where element is undefined in appendChild', () => {
    const props: ElementProps = { tag: 'div' };
    const generator = new BaseComponentGenerator(props);
    (generator as any).element = undefined;

    expect(() => {
      generator.appendChild(document.createElement('span'));
    }).not.toThrow();
  });
});
