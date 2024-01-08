import {
  SpectatorService,
  SpyObject,
  createServiceFactory,
} from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { DataService } from '../data.service';
import { UserCollection } from '../models/user-collection.model';
import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  const mockResponse: { attributes: UserCollection }[] = [
    {
      attributes: {
        name: 'John',
        favouriteStories: {
          data: [
            { attributes: { title: 'Matilda', author: 'Roald Dahl' }, id: '1' },
          ],
        },
      },
    },
    {
      attributes: {
        name: 'Jane',
        favouriteStories: {
          data: [
            {
              attributes: { title: 'Fantastic Mr. Fox', author: 'Roald Dahl' },
              id: '2',
            },
          ],
        },
      },
    },
  ];

  let spectator: SpectatorService<UserDataService>;
  let mockDataService: SpyObject<DataService>;

  const createService = createServiceFactory({
    service: UserDataService,
    mocks: [DataService],
  });

  beforeEach(() => {
    spectator = createService();
    mockDataService = spectator.inject(DataService);
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should call on the dataService with a query string', () => {
      mockDataService.graphql.mockReturnValue(of(mockResponse));

      spectator.service.getUsers();

      expect(mockDataService.graphql).toHaveBeenCalledWith(expect.any(String));
    });

    it('should transform a UserCollection into an array of Users and return it', () => {
      mockDataService.graphql.mockReturnValue(
        of({ data: { appUsers: { data: mockResponse } } })
      );
      const expectedReturn: User[] = [
        {
          name: 'John',
          favouriteStories: [{ title: 'Matilda', author: 'Roald Dahl' }],
        },
        {
          name: 'Jane',
          favouriteStories: [
            { title: 'Fantastic Mr. Fox', author: 'Roald Dahl' },
          ],
        },
      ];

      spectator.service.getUsers().subscribe((result) => {
        expect(result).toStrictEqual(expectedReturn);
      });
    });
  });
});
