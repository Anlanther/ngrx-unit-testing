import { Story } from '../../models/story.model';
import { User } from '../../models/user.model';
import { StrapiCollection } from './strapi-collection.model';

export type UserCollection = User & {
  favouriteStories: { data: StrapiCollection<Story>[] };
};
