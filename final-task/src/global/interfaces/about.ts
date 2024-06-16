export interface UserProfile {
  name: string;
  roles: string[];
  bio: string;
  photo: string;
  github: {
    profile: string;
  };
  contributions: string[];
}
