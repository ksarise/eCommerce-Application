import BaseComponentGenerator from '../../../tags/base-component';
import tags from '../../../tags/tags';

export type NavigationButtonCallback = () => void;

export default class NavigationButtons {
  private nextButton: HTMLButtonElement;

  private prevButton: HTMLButtonElement;

  private submitButton: HTMLButtonElement;

  private currentStep: number = 0;

  constructor() {
    this.nextButton = tags.button(['next-btn', 'button-login'], 'Next', {
      type: 'button',
      disabled: 'on',
    }) as HTMLButtonElement;

    this.prevButton = tags.button(['prev-btn', 'button-login'], 'Previous', {
      type: 'button',
      disabled: 'on',
    }) as HTMLButtonElement;

    this.submitButton = tags.button(
      ['submit-btn', 'button-login'],
      'Register',
    ) as HTMLButtonElement;

    this.submitButton.disabled = true;

    const buttonsBlock = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['registration__button-block'],
    });

    buttonsBlock.appendChildren([
      this.prevButton,
      this.nextButton,
      this.submitButton,
    ]);
  }

  public bindNextButton(callback: NavigationButtonCallback): void {
    this.nextButton.addEventListener('click', callback);
  }

  public bindPrevButton(callback: NavigationButtonCallback): void {
    this.prevButton.addEventListener('click', callback);
  }

  public bindSubmitButton(callback: NavigationButtonCallback): void {
    this.submitButton.addEventListener('click', callback);
  }

  public toggleNextButton(disabled: boolean): void {
    this.nextButton.disabled = disabled;
  }

  public togglePrevButton(disabled: boolean): void {
    this.prevButton.disabled = disabled;
  }

  public toggleSubmitButton(disabled: boolean): void {
    this.submitButton.disabled = disabled;
  }

  public getNextButton(): HTMLButtonElement {
    return this.nextButton;
  }

  public getPrevButton(): HTMLButtonElement {
    return this.prevButton;
  }

  public getSubmitButton(): HTMLButtonElement {
    return this.submitButton;
  }

  public getButtonsBlock(): HTMLElement {
    return this.nextButton.parentElement as HTMLElement;
  }

  public updateFormView(blocks: HTMLElement[], currentStep: number): void {
    this.currentStep = currentStep;
    blocks.forEach((originalBlock, index) => {
      const block = originalBlock;
      block.style.display = this.currentStep === index ? 'flex' : 'none';
    });

    this.prevButton.style.display = this.currentStep > 0 ? 'flex' : 'none';
    this.togglePrevButton(this.currentStep === 0);
    this.nextButton.style.display =
      this.currentStep < blocks.length - 1 ? 'flex' : 'none';
    this.submitButton.style.display =
      this.currentStep === blocks.length - 1 ? 'flex' : 'none';
  }

  public validateCurrentBlock(currentBlock: HTMLElement): void {
    const inputs = currentBlock.querySelectorAll('.registration__field__input');
    const hasInvalidElements =
      currentBlock.querySelectorAll('.invalid').length > 0;
    const allFieldsFilled = Array.from(inputs).every(
      (input) => (input as HTMLInputElement).value.trim() !== '',
    );
    this.toggleNextButton(hasInvalidElements || !allFieldsFilled);
  }
}
