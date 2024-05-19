import tags from '../tags/tags';
import { LoginForm } from '../interface/interface';
import * as check from '../services/checkInput';

export default class Login {
  private form: HTMLFormElement;

  private inputEmail: HTMLInputElement;

  private inputPassword: HTMLInputElement;

  private history: HTMLElement | null;

  private errorEmail: HTMLElement;

  private errorPassword: HTMLElement;

  private checkBox: HTMLInputElement;

  private checkBoxLabel: HTMLLabelElement;

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
    this.checkBoxLabel = tags.label(['password-visible-label'], '', {
      for: 'VisiblePassword',
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
    this.form.append(
      h1,
      this.createBlockInput(LoginForm.EMAIL),
      this.createBlockInput(LoginForm.PASSWORD),
      button,
      register,
    );
    this.newHistory = this.form;
    return this.form;
  }

  private createBlockInput(labelText: LoginForm) {
    const block = tags.div(['block-input']);
    const label = tags.label(
      ['label', `label-${labelText.toLocaleLowerCase()}`],
      labelText,
      { for: `input${labelText}` },
    );
    if (labelText === LoginForm.EMAIL) {
      block.append(label, this.inputEmail, this.errorEmail);
    } else {
      block.append(
        label,
        this.inputPassword,
        this.checkBox,
        this.checkBoxLabel,
        this.errorPassword,
      );
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
    this.form.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.checkBox.checked = false;
      (document.getElementById('buttonLogin') as HTMLButtonElement).disabled =
        true;
      this.inputEmail.value = '';
      this.inputPassword.value = '';
    });
  }

  private addListenerToInput() {
    this.inputEmail.addEventListener('input', () => {
      const result: [boolean, string] = check.checkEmail(this.inputEmail.value);
      this.writeError(result, true);
    });
    this.inputPassword.addEventListener('input', () => {
      const result: [boolean, string] = check.checkPassword(
        this.inputPassword.value,
      );
      this.writeError(result, false);
    });
  }

  writeError([right, error]: [boolean, string], flag: boolean) {
    if (flag) {
      this.errorEmail.classList.toggle('error-hidden', right);
      this.errorEmail.innerHTML = error;
      this.inputEmail.classList.toggle('input-error', !right);
    } else {
      this.inputPassword.classList.toggle('input-error', !right);
      this.errorPassword.classList.toggle('error-hidden', right);
      this.errorPassword.innerHTML = error;
    }
    this.checkButton();
  }

  checkButton() {
    const buttonLogin = document.getElementById('buttonLogin');
    if (
      this.errorPassword.classList.contains('error-hidden') &&
      this.errorEmail.classList.contains('error-hidden') &&
      this.inputEmail.value?.length !== 0 &&
      this.inputPassword.value?.length !== 0 &&
      buttonLogin
    ) {
      (buttonLogin as HTMLButtonElement).disabled = false;
    } else {
      (buttonLogin as HTMLButtonElement).disabled = true;
    }
  }

  private addCheckboxListener() {
    this.checkBox.addEventListener('click', () => {
      if (this.inputPassword.type === 'password') {
        this.inputPassword.type = 'text';
        this.checkBoxLabel.style.backgroundImage =
          'url(/eye-password-show.svg)';
      } else {
        this.inputPassword.type = 'password';
        this.checkBoxLabel.style.backgroundImage =
          'url(/eye-password-hide.svg)';
      }
    });
  }
}
