import tags from '../../../tags/tags';

function createDate(callText: string) {
  const elem = tags.div(
    [
      'profile__data',
      `profile__data_${callText.toLocaleLowerCase().split(' ').join('')}`,
    ],
    callText,
  );
  return elem.getElement();
}

export default class Personal {
  public profileName: HTMLElement;

  public profileSurname: HTMLElement;

  public profileDateofBirth: HTMLElement;

  public profileEmail: HTMLElement;

  public blockProfile: HTMLElement;

  public handleClickLoginEdit: ((event?: Event) => void) | undefined;

  constructor() {
    this.profileName = tags.span(['profile__info', 'profile__info_name']);
    this.profileSurname = tags.span(['profile__info', 'profile__info_surname']);
    this.profileDateofBirth = tags.span([
      'profile__info',
      'profile__info_dateofbirth',
    ]);
    this.profileEmail = tags.span(['profile__info', 'profile__info_email']);
    this.blockProfile = tags.div(['profile__personal']).getElement();
    this.createBlock();
  }

  public initPersonal() {
    return this.blockProfile;
  }

  private createBlock() {
    const buttonEdit = tags.button(
      ['profile__button', 'profile__button_personal'],
      'Edit',
      {},
      'click',
      this.handleClickLoginEdit,
    );
    const profileH1 = tags.h2(['profile__header'], 'Personal information');
    const imgProfile = tags.div(['img_edit']).getElement();
    buttonEdit.prepend(imgProfile);
    this.blockProfile.append(
      profileH1,
      createDate('Name'),
      this.profileName,
      createDate('Surname'),
      this.profileSurname,
      createDate('Date of birth'),
      this.profileDateofBirth,
      createDate('Email'),
      this.profileEmail,
      buttonEdit,
    );
  }

  public changePersonalInfo(
    name: string,
    surname: string,
    dateofirth: string,
    email: string,
  ): void {
    this.profileName.innerHTML = name;
    this.profileSurname.innerHTML = surname;
    this.profileDateofBirth.innerHTML = dateofirth;
    this.profileEmail.innerHTML = email;
  }
}
