import tags from '../../tags/tags';
import teamMembers from './team.json';
import TeamMember from './teamMembre';
import { UserProfile } from '../../global/interfaces/about';

export default class AboutUs {
  private blockAbout: HTMLElement;

  private team: HTMLElement;

  constructor() {
    this.blockAbout = tags.div(['about-us']).getElement();
    this.team = tags.div(['about-us__team']).getElement();
    this.createContent();
  }

  public createAboutUs() {
    return this.blockAbout;
  }

  private createContent() {
    const heading = tags.h2(['about-us__heading'], 'Meet Our team!');
    const data: UserProfile[] = teamMembers;
    data.forEach((element) => {
      const member = new TeamMember(element);
      this.team.append(member.getMainBlock());
    });
    this.team.prepend(heading);
    this.blockAbout.append(this.team);
  }
}
