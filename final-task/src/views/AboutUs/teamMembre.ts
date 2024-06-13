import tags from '../../tags/tags';
import { UserProfile } from '../../global/interfaces/about';

export default class TeamMember {
  private data: UserProfile;

  private memberMainBlock: HTMLElement;

  private memberBackBlock: HTMLElement;

  private memberContribution: HTMLElement;

  constructor(data: UserProfile) {
    this.data = data;
    this.memberMainBlock = tags.a(
      ['about-us__front'],
      `#${this.data.name.split(' ').join('').toLowerCase()}`,
    );

    this.memberBackBlock = tags.a(
      ['about-us__back'],
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
      src: this.data.photo,
      alt: this.data.name,
    });
    const blockphoto = tags.div(['about-us__round_photo']).getElement();
    blockphoto.append(photo);
    const name = tags.div(['about-us__name'], this.data.name).getElement();
    const nameCopy = name.cloneNode(true);
    const roles = tags.ul(['about-us__role']);
    this.data.roles.forEach((role) => {
      const roleLi = tags.li(['about-us__li'], role);
      roles.append(roleLi);
    });

    const githubLink = tags.a(['about-us__github'], this.data.github.profile);
    const bio = `${this.data.bio.slice(0, 250)}...`;
    const biografy = tags.div(['about-us__bio'], bio).getElement();
    this.memberMainBlock.append(blockphoto, name);
    this.memberBackBlock.append(nameCopy, roles, biografy, githubLink);
  }

  public getMainBlock() {
    return this.memberMainBlock;
  }

  public getBackBlock() {
    return this.memberBackBlock;
  }
}
