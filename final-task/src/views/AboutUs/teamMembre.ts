import tags from '../../tags/tags';
import { UserProfile } from '../../global/interfaces/about';

export default class TeamMember {
  private data: UserProfile;

  private memberMainBlock: HTMLElement;

  private memberContribution: HTMLElement;

  constructor(data: UserProfile) {
    this.data = data;
    this.memberMainBlock = tags.a(
      ['abut-us__member'],
      `#${this.data.name.split(' ').join('').toLowerCase()}`,
    );
    this.memberContribution = tags
      .div(['about-us__content'], '', {
        id: `${this.data.name.split(' ').join('').toLowerCase()}`,
      })
      .getElement();
    this.createElements();
  }

  private createElements() {
    this.createMember();
    // this.createContent()
  }

  private createMember() {
    const photo = tags.img(['about-us__photo'], {
      href: this.data.photo,
      alt: this.data.name,
    });
    const name = tags.div(['about-us__name'], this.data.name).getElement();
    const role = tags
      .div(['about-us__role'], this.data.roles.join(' '))
      .getElement();
    const githubLink = tags.a(['about-us__github'], this.data.github.profile);
    this.memberMainBlock.append(photo, name, role, githubLink);
  }

  public getMainBlock() {
    return this.memberMainBlock;
  }
}
