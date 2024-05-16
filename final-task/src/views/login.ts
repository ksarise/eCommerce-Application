import tags from '../tags/tags';
import BaseComponentGenerator from '../tags/base-component';
import { LoginForm } from '../interface/interface';
import * as check from '../function/checkInput';

export default class Login {
  private form: BaseComponentGenerator;

  private inputEmail: BaseComponentGenerator;

  private inputPassword: BaseComponentGenerator;

  private history: HTMLElement | null;

  private errorEmail: BaseComponentGenerator;

  private errorPassword: BaseComponentGenerator;

  private checkBox: BaseComponentGenerator;

  private body: HTMLBodyElement;

  constructor() {
    this.form = tags.form(['form', 'form-login'], {
      id: 'formLogin',
      type: 'submit',
    });
    this.inputEmail = tags.input(['input', 'input-login'], {
      type: 'text',
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
    this.checkBox = tags.input(['password-visible'], {
      type: 'checkbox',
      name: 'password-visible',
      id: 'VisiblePassword',
      title: 'view password',
    });
    this.body = document.querySelector('body')!;
  }

  public createLogin() {
    if (this.history) {
      return this.history;
    }
    this.addCheckboxListener();
    this.addListenerToInput();
    this.addListenerToLogin();
    return this.addLoginForm();
  }

  protected addLoginForm() {
    const h1 = tags.h1(['h1-login', 'h1'], 'Login');
    const button = tags.button(['button', 'button-login'], 'Login', {
      type: 'submit',
      id: 'buttonLogin',
      disabled: 'true',
    });
    const register = tags.a(
      ['register-link'],
      '/registration',
      'Did you registered? Register',
      { title: 'Register', 'data-navigo': 'true' },
    );
    this.form.appendChildren([
      h1,
      this.createBlockInput(LoginForm.EMAIL),
      this.createBlockInput(LoginForm.PASSWORD),
      button,
      register,
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
      block.appendChildren([
        label,
        this.inputPassword,
        this.checkBox,
        this.errorPassword,
      ]);
    }
    return block;
  }

  set newHistory(value: HTMLElement) {
    this.history = value;
  }

  public addClassToLogin(flag: boolean = false) {
    this.body.classList.toggle('body-login', flag);
    document.querySelector('.view')!.classList.toggle('view-login', flag);
  }

  private addListenerToLogin() {
    this.form.getElement().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      (this.checkBox.getElement() as HTMLInputElement).checked = false;
      (document.getElementById('buttonLogin') as HTMLButtonElement).disabled =
        true;
      (this.inputEmail.getElement() as HTMLInputElement).value = '';
      (this.inputPassword.getElement() as HTMLInputElement).value = '';
    });
  }

  private addListenerToInput() {
    this.inputEmail.getElement().addEventListener('input', () => {
      const result: [boolean, string] = check.checkEmail(
        (this.inputEmail.getElement() as HTMLInputElement).value,
      );
      this.writeError(result, true);
    });
    this.inputPassword.getElement().addEventListener('input', () => {
      const result: [boolean, string] = check.checkPassword(
        (this.inputPassword.getElement() as HTMLInputElement).value,
      );
      this.writeError(result, false);
    });
  }

  writeError([right, error]: [boolean, string], flag: boolean) {
    if (flag) {
      this.errorEmail.getElement().classList.toggle('error-hidden', right);
      this.errorEmail.getElement().innerHTML = error;
      this.inputEmail.getElement().classList.toggle('input-error', !right);
    } else {
      this.inputPassword.getElement().classList.toggle('input-error', !right);
      this.errorPassword.getElement().classList.toggle('error-hidden', right);
      this.errorPassword.getElement().innerHTML = error;
    }
    this.checkButton();
  }

  checkButton() {
    const buttonLogin = document.getElementById('buttonLogin');
    if (
      this.errorPassword.getElement().classList.contains('error-hidden') &&
      this.errorEmail.getElement().classList.contains('error-hidden') &&
      (this.inputEmail.getElement() as HTMLInputElement).value?.length !== 0 &&
      (this.inputPassword.getElement() as HTMLInputElement).value?.length !==
        0 &&
      buttonLogin
    ) {
      (buttonLogin as HTMLButtonElement).disabled = false;
    } else {
      (buttonLogin as HTMLButtonElement).disabled = true;
    }
  }

  private addCheckboxListener() {
    this.checkBox.getElement().addEventListener('click', () => {
      if (
        (this.inputPassword.getElement() as HTMLInputElement).type ===
        'password'
      ) {
        (this.inputPassword.getElement() as HTMLInputElement).type = 'text';
      } else {
        (this.inputPassword.getElement() as HTMLInputElement).type = 'password';
      }
    });
  }
}
