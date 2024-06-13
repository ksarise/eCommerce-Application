import tags from '../../tags/tags';
import teamMembers from './team.json';
import TeamMember from './teamMember';
import { UserProfile } from '../../global/interfaces/about';

export default class AboutUs {
  private blockAbout: HTMLElement;

  private team: HTMLElement;

  private contribution: HTMLElement;

  constructor() {
    this.blockAbout = tags.div(['about-us']).getElement();
    this.team = tags.div(['about-us__team']).getElement();
    this.contribution = tags.div(['about-us__contribution']).getElement();
    this.createContent();
  }

  public createAboutUs() {
    return this.blockAbout;
  }

  private createContent() {
    const heading = tags.h2(['about-us__heading'], 'Meet Our team!');
    const data: UserProfile[] = teamMembers;
    const membersBlock = tags.div(['about-us__members']).getElement();
    data.forEach((element) => {
      const card = tags.div(['about-us__member']).getElement();
      const member = new TeamMember(element);
      card.append(member.getMainBlock(), member.getBackBlock());
      this.contribution.append(member.getContributionBlock());
      membersBlock.append(card);
    });
    this.team.prepend(heading, membersBlock);
    this.blockAbout.append(this.team, this.contribution);
  }
}
