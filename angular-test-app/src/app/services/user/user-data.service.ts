import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Story } from '../../models/story.model';
import { User } from '../../models/user.model';
import { DataService } from '../data.service';
import { StrapiCollection } from '../models/strapi-collection.model';
import { UserCollection } from '../models/user-collection.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private dataService: DataService) {}

  getUsers(): Observable<User[]> {
    const queryName = `getUsers`;

    return this.dataService.graphql<User>(this.getQuery(queryName)).pipe(
      map((response) => {
        return response.appUsers.data.map(
          (user: { attributes: UserCollection }) => {
            const favouriteStories: Story[] =
              user.attributes.favouriteStories.data.map(
                (story: StrapiCollection<Story>) => ({
                  title: story.attributes.title,
                  author: story.attributes.author,
                })
              );
            return { name: user.attributes.name, favouriteStories };
          }
        );
      })
    );
  }

  private getQuery(queryName: string, settings?: string) {
    return `query ${queryName}{
      appUsers ${settings ?? ''}{
        data {
          attributes {
            name
            favouriteStories {
              data {
                attributes {
                  title
                  author
                }
              }
            }
          }
        }
      }
    }
    `;
  }
}
