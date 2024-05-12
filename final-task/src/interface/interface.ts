export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[] | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  type?: string;
  eventCallback?: (event?: Event) => void;
}
