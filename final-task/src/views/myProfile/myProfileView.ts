import Personal from './components/personal';
import tags from '../../tags/tags';

export default class Profile {
  public personalBlock: Personal;

  public blockProfile: HTMLElement;

  constructor() {
    this.personalBlock = new Personal();
    this.blockProfile = tags.div(['profile']).getElement();
    this.createProfile();
  }

  public init() {
    return this.blockProfile;
  }

  createProfile() {
    this.blockProfile.append(this.personalBlock.initPersonal());
  }
}
