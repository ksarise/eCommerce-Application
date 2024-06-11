import tags from '../tags/tags';
import { LoginForm } from '../global/enums/login';
import * as check from '../services/checkInput';

export default class Login {
  public form: HTMLFormElement;

  public inputEmail: HTMLInputElement;

  public inputPassword: HTMLInputElement;

  public history: HTMLElement | null;

  public errorEmail: HTMLElement;

  public errorPassword: HTMLElement;

  public checkBox: HTMLInputElement;

  private checkBoxLabel: HTMLLabelElement;

  private body: HTMLBodyElement;

  private popUp: HTMLElement;

  private popText: HTMLElement;

  private container: HTMLElement;

  public cross: HTMLElement;

  constructor() {
    this.form = tags.form(['form', 'form-login'], {
      id: 'formLogin',
      type: 'submit',
      autocomplete: 'on',
    });
    this.inputEmail = tags.input(['input', 'input-login'], {
      type: 'text',
      placeholder: 'Email...',
      id: 'inputEmail',
      autocomplete: 'on',
    });
    this.inputPassword = tags.input(['input', 'input-password'], {
      type: 'password',
      placeholder: 'Password...',
      id: 'inputPassword',
      autocomplete: 'on',
    });
    this.history = null;
    this.errorEmail = tags
      .div(['error', 'error-hidden'], '', {
        id: 'errorEmail',
      })
      .getElement() as HTMLDivElement;
    this.errorPassword = tags
      .div(['error', 'error-hidden'], '', {
        id: 'errorPassword',
      })
      .getElement() as HTMLDivElement;
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
    this.popUp = tags
      .div(['pop-up', 'pop-up-hidden'], '', {
        id: 'popLogin',
      })
      .getElement() as HTMLDivElement;
    this.popText = tags
      .div(['pop-up-text'], '', {
        id: 'popText',
      })
      .getElement() as HTMLDivElement;
    this.container = tags
      .div(['container-login'], '', {
        id: 'container',
      })
      .getElement() as HTMLDivElement;
    this.cross = tags
      .div(['cross'], '', {
        id: 'cross',
      })
      .getElement() as HTMLDivElement;
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
    const register = tags.a(
      ['register-link'],
      '/registration',
      "Don't have an account? Sign up",
      { title: 'Register', 'data-navigo': 'true' },
    );
    this.form.append(
      h1,
      this.createBlockInput(LoginForm.EMAIL),
      this.createBlockInput(LoginForm.PASSWORD),
      button,
      register,
    );
    this.container.append(this.createPopUp(), this.form);
    this.newHistory = this.container;
    return this.container;
  }

  private createPopUp() {
    const error = tags
      .div(['error-pop-up'], 'Invalid email or password', {
        id: 'error-pop-up',
      })
      .getElement() as HTMLDivElement;
    this.popText.innerHTML = 'sdfghj';
    this.popUp.append(this.cross, this.popText, error);
    return this.popUp;
  }

  private createBlockInput(labelText: LoginForm) {
    const block = tags.div(['block-input']).getElement() as HTMLDivElement;
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

  public addListenerToLogin() {
    this.checkBox.checked = false;
    (document.getElementById('buttonLogin') as HTMLButtonElement).disabled =
      true;
    this.inputEmail.value = '';
    this.inputPassword.value = '';
  }

  public addListenerToEmail() {
    const result: [boolean, string] = check.checkEmail(this.inputEmail.value);
    this.writeError(result, true);
  }

  public addListenerToPassword() {
    const result: [boolean, string] = check.checkPassword(
      this.inputPassword.value,
    );
    this.writeError(result, false);
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

  public addCheckboxListener() {
    if (this.inputPassword.type === 'password') {
      this.inputPassword.type = 'text';
      this.checkBoxLabel.style.backgroundImage = 'url(/eye-password-show.svg)';
    } else {
      this.inputPassword.type = 'password';
      this.checkBoxLabel.style.backgroundImage = 'url(/eye-password-hide.svg)';
    }
  }

  public addCrossListener() {
    this.popUp.classList.toggle('pop-up-hidden', true);
  }

  public addPopUpWithError(text: string) {
    this.popText.innerHTML = text;
    this.popUp.classList.toggle('pop-up-hidden', false);
    this.inputEmail.classList.toggle('input-error', true);
    this.inputPassword.classList.toggle('input-error', true);
  }
}
