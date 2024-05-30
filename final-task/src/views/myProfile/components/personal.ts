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

  constructor() {
    this.profileName = tags.span(['profile__info', 'profile__info_name']);
    this.profileSurname = tags.span(['profile__info', 'profile__info_surname']);
    this.profileDateofBirth = tags.span([
      'profile__info',
      'profile__info_dateofbirth',
    ]);
    this.profileEmail = tags.span(['profile__info', 'profile__info_email']);
    this.blockProfile = tags.span(['profile']);
    this.createBlock();
  }

  public initPersonal() {
    return this.createBlock();
  }

  private createBlock() {
    const profileH1 = tags.h2(['profile__header'], 'Personal information');
    this.blockProfile.append(
      profileH1,
      createDate('Name'),
      this.profileName,
      createDate('Surname'),
      this.profileName,
      createDate('Date of birth'),
      this.profileName,
      createDate('Email'),
      this.profileName,
    );
    return this.blockProfile;
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
