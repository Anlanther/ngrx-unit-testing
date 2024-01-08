import { Story } from '../../models/story.model';
import { User } from '../../models/user.model';
import { StrapiCollection } from './strapi-collection.model';

type PureUser = Omit<User, 'favouriteStories'>;

export type UserCollection = PureUser & {
  favouriteStories: { data: StrapiCollection<Story>[] };
};
