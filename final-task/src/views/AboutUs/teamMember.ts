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
    this.createContent();
  }

  private createMember() {
    const blockPhoto = tags.div(['about-us__round_photo']).getElement();
    blockPhoto.setAttribute(
      'style',
      !this.data.photo.includes('https')
        ? `background-image: url(/about_us/${this.data.photo});`
        : `background-image: url(${this.data.photo});`,
    );
    const name = tags.div(['about-us__name'], this.data.name).getElement();
    const nameCopy = name.cloneNode(true);
    const roles = tags.ul(['about-us__role']);
    this.data.roles.forEach((role) => {
      const roleLi = tags.li(['about-us__li'], role);
      roles.append(roleLi);
    });
    const githubLink = tags.a(['about-us__github'], this.data.github.profile);
    const bio = `${this.data.bio.slice(0, 250)}...`;
    const biography = tags.div(['about-us__bio'], bio).getElement();
    this.memberMainBlock.append(blockPhoto, name);
    this.memberBackBlock.append(nameCopy, roles, biography, githubLink);
  }

  private createContent() {
    const headingName = tags.h2(['about-us__heading'], this.data.name);
    const headingContribution = tags.h3(
      ['about-us__heading'],
      'Contributions:',
    );
    const biography = tags
      .div(['about-us__biography'], this.data.bio)
      .getElement();
    const contribution = tags.ul(['about-us__contribution']);
    this.data.contributions.forEach((elem) => {
      const contributionLi = tags.li(['about-us__contribution_li'], elem);
      contribution.append(contributionLi);
    });
    const githubLink = tags.a(['about-us__gitinfo'], this.data.github.profile);
    const personalInfo = tags.div(['about-us__personal_info']).getElement();
    personalInfo.append(
      headingName,
      biography,
      headingContribution,
      contribution,
      githubLink,
    );
    this.memberContribution.append(personalInfo);
  }

  public getMainBlock() {
    return this.memberMainBlock;
  }

  public getBackBlock() {
    return this.memberBackBlock;
  }

  public getContributionBlock() {
    return this.memberContribution;
  }
}
