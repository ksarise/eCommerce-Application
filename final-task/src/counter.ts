export default function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const elem = element;
  const setCounter = (count: number) => {
    counter = count;
    elem.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
