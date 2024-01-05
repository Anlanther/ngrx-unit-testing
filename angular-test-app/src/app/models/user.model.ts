import { Story } from './story.model';

export interface User {
  name: string;
  favouriteStories: Story[];
}
