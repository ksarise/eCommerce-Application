import Personal from './components/personal';
import tags from '../../tags/tags';
import Addresses from './components/addresses';

export default class ProfileView {
  public personalBlock: Personal;

  public blockProfile: HTMLElement;

  public addressesBlock: Addresses;

  constructor() {
    this.personalBlock = new Personal();
    this.addressesBlock = new Addresses();
    this.blockProfile = tags.div(['profile']).getElement();
    this.createProfileBlock();
  }

  public createProfile() {
    return this.blockProfile;
  }

  createProfileBlock() {
    this.blockProfile.append(this.personalBlock.initPersonal());
    this.blockProfile.append(...this.addressesBlock.createAddressesBlocks());
  }
}
