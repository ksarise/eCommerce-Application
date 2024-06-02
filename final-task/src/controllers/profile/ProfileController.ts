import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import ProfileModel from '../../models/profile/profileModel';
import ProfileView from '../../views/myProfile/myProfileView';

export default class ProfileController {
  private view: ProfileView;

  private model: ProfileModel;

  constructor(view: ProfileView, model: ProfileModel) {
    this.view = view;
    this.model = model;
  }

  public init() {
    this.view.personalBlock.handleClickProfileEdit =
      this.handleClickLoginEditPersonal.bind(this);
  }

  public updateData(body: Customer) {
    if (body.firstName && body.lastName && body.dateOfBirth && body.email) {
      this.view.personalBlock.changePersonalInfo(
        body.firstName,
        body.lastName,
        body.dateOfBirth,
        body.email,
      );
    }
    this.view.addressesBlock.changeAddresses(body);
    this.view.addressesBlock.defaultAddresses(body);
  }

  public handleClickLoginEditPersonal() {
    const variables = this.view.personalBlock;
    this.view.popUpBlock.createPersonalForm(
      variables.profileName.innerHTML,
      variables.profileSurname.innerHTML,
      variables.profileDateofBirth.innerHTML,
      variables.profileEmail.innerHTML,
    );
  }
}
