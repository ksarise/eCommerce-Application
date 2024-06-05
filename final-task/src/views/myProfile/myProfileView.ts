import Personal from './components/personal';
import tags from '../../tags/tags';
import Addresses from './components/addresses';
import PopUpForm from './components/popUpForm';

export default class ProfileView {
  public personalBlock: Personal;

  public blockProfile: HTMLElement;

  public addressesBlock: Addresses;

  public popUpBlock: PopUpForm;

  constructor() {
    this.personalBlock = new Personal();
    this.addressesBlock = new Addresses();
    this.popUpBlock = new PopUpForm();
    this.blockProfile = tags.div(['profile']).getElement();
    this.createProfileBlock();
  }

  public createProfile() {
    return this.blockProfile;
  }

  private createProfileBlock() {
    this.blockProfile.append(this.personalBlock.initPersonal());
    this.blockProfile.append(...this.addressesBlock.createAddressesBlocks());
    this.blockProfile.prepend(this.popUpBlock.createPopUpBlock());
  }
}
