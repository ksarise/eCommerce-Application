import Personal from './components/personal';
import tags from '../../tags/tags';

export default class ProfileView {
  public personalBlock: Personal;

  public blockProfile: HTMLElement;

  constructor() {
    this.personalBlock = new Personal();
    this.blockProfile = tags.div(['profile']).getElement();
    this.createProfileBlock();
  }

  public createProfile() {
    return this.blockProfile;
  }

  createProfileBlock() {
    this.blockProfile.append(this.personalBlock.initPersonal());
  }
}
