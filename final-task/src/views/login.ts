import tags from '../tags/tags';
import BaseComponentGenerator from '../tags/base-component';
import { LoginForm } from '../interface/interface';

export default class Login {
  private form: BaseComponentGenerator;

  private inputEmail: BaseComponentGenerator;

  private inputPassword: BaseComponentGenerator;

  private history: HTMLElement | null;

  private errorEmail: BaseComponentGenerator;

  private errorPassword: BaseComponentGenerator;

  constructor() {
    this.form = tags.form(['form', 'form-login'], {
      id: 'formLogin',
      type: 'submit',
    });
    this.inputEmail = tags.input(['input', 'input-login'], {
      type: 'email',
      placeholder: 'Email...',
      id: 'inputEmail',
    });
    this.inputPassword = tags.input(['input', 'input-password'], {
      type: 'password',
      placeholder: 'Password...',
      id: 'inputPassword',
    });
    this.history = null;
    this.errorEmail = tags.div(['error', 'error-hidden'], '', {
      id: 'errorEmail',
    });
    this.errorPassword = tags.div(['error', 'error-hidden'], '', {
      id: 'errorPassword',
    });
  }

  public createLogin() {
    if (this.history) {
      return this.history;
    }
    return this.addLoginForm();
  }

  protected addLoginForm() {
    const h1 = tags.h1(['h1-login', 'h1'], 'Login');
    const button = tags.button(['button', 'button-login'], 'Login', {
      type: 'submit',
      id: 'buttonLogin',
      disabled: 'true',
    });
    this.form.appendChildren([
      h1,
      this.createBlockInput(LoginForm.EMAIL),
      this.createBlockInput(LoginForm.PASSWORD),
      button,
    ]);
    this.newHistory = this.form.getElement() as HTMLElement;
    return this.form.getElement();
  }

  private createBlockInput(labelText: LoginForm) {
    const block = tags.div(['block-input']);
    const label = tags.label(
      ['label', `label-${labelText.toLocaleLowerCase()}`],
      labelText,
      { for: `input${labelText}` },
    );
    if (labelText === LoginForm.EMAIL) {
      block.appendChildren([label, this.inputEmail, this.errorEmail]);
    } else {
      block.appendChildren([label, this.inputPassword, this.errorPassword]);
    }
    return block;
  }

  set newHistory(value: HTMLElement) {
    this.history = value;
  }
}
