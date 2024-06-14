import tags from '../../tags/tags';
import teamMembers from './team.json';
import TeamMember from './teamMember';
import { UserProfile } from '../../global/interfaces/about';
import teamCollaboration from './collaboration.json';

export default class AboutUs {
  private blockAbout: HTMLElement;

  private team: HTMLElement;

  private contribution: HTMLElement;

  constructor() {
    this.blockAbout = tags.div(['about-us']).getElement();
    this.team = tags.div(['about-us__team']).getElement();
    this.contribution = tags.div(['about-us__contribution']).getElement();
    this.createContent();
    this.createCollaboration();
    this.cteateLinkCourses();
  }

  public createAboutUs() {
    return this.blockAbout;
  }

  private createContent() {
    const heading = tags.h1(['about-us__heading'], 'Meet Our team!');
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

  private createCollaboration() {
    const heading = tags.h1(['about-us__heading'], teamCollaboration.heading);
    const points = tags.div(['about-us__collaboration']).getElement();
    teamCollaboration.collaboration.forEach((text) => {
      const point = tags.div(['about-us__point'], `${text}`).getElement();
      points.append(point);
    });
    this.blockAbout.append(heading, points);
  }

  private cteateLinkCourses() {
    const heading = tags.h1(['about-us__heading'], 'Courses');
    const link = tags.a(['about-us__rss'], 'https://rs.school/');
    this.blockAbout.append(heading, link);
  }
}
