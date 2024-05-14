import BaseComponentGenerator from '../../components/base-component';
import tags from '../../components/tags';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import AddressBlock from './components/AddressInfoBlock';
import './style.css';

export default class RegistrationPageView {
  private page: BaseComponentGenerator;

  private GeneralInfoBlock: HTMLElement;

  private AddressInfoBlock: HTMLElement;

  private SubmitButton: HTMLElement;

  constructor() {
    this.page = new BaseComponentGenerator({
      tag: 'form',
      classNames: ['registration__page'],
    });
    this.GeneralInfoBlock = new GeneralInfoBlock().getElement();
    this.AddressInfoBlock = new AddressBlock().getElement();
    this.SubmitButton = tags.button(['submit-btn'], 'Submit');

    this.page.appendChildren([
      this.GeneralInfoBlock,
      this.AddressInfoBlock,
      this.SubmitButton,
    ]);
  }

  public RenderPage() {
    return this.page.getElement();
  }
}
