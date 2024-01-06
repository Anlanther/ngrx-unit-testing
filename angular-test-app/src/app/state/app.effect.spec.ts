import { TestBed } from '@angular/core/testing';
import { SpyObject } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { AppStore } from '../models/app-store.model';
import { Story } from '../models/story.model';
import { User } from '../models/user.model';
import { StoryDataService } from '../services/story/story-data.service';
import { UserDataService } from '../services/user/user-data.service';
import { AppActions } from './app.actions';
import { loadApp$ } from './app.effect';
import { AppFeature } from './app.state';

describe('AppEffects', () => {
  const mockUsers: User[] = [
    {
      name: 'John',
      favouriteStories: [{ title: 'Matilda', author: 'Roald Dahl' }],
    },
    {
      name: 'Jane',
      favouriteStories: [{ title: 'Fantastic Mr. Fox', author: 'Roald Dahl' }],
    },
  ];
  const mockStories: Story[] = [
    {
      title: 'Story1',
      author: 'A1',
    },
    {
      title: 'Story2',
      author: 'A2',
    },
    { title: 'Matilda', author: 'Roald Dahl' },
    { title: 'Fantastic Mr. Fox', author: 'Roald Dahl' },
  ];

  const mockUserDataServiceImp = { getUsers: jest.fn() };
  const mockStoryDataServiceImp = { getStories: jest.fn() };

  let mockActions$ = new Observable<Action>();
  let mockUserDataService: SpyObject<UserDataService>;
  let mockStoryDataService: SpyObject<StoryDataService>;
  let mockStore: MockStore<AppStore>;

  beforeEach(() => {
    // Use createServiceFactory() instead if effects were in a class
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => mockActions$),
        provideMockStore({
          selectors: [
            { selector: AppFeature.selectActiveUser, value: mockUsers[0] },
          ],
        }),
        { provide: UserDataService, useValue: mockUserDataServiceImp },
        { provide: StoryDataService, useValue: mockStoryDataServiceImp },
      ],
    });
    mockUserDataService = TestBed.inject(
      UserDataService
    ) as SpyObject<UserDataService>;
    mockStoryDataService = TestBed.inject(
      StoryDataService
    ) as SpyObject<StoryDataService>;
    mockStore = TestBed.inject(Store<AppStore>) as MockStore<AppStore>;
  });

  describe('loadApp$', () => {
    it('should trigger getUsers and getStories action', () => {
      mockActions$ = hot('-a', { a: AppActions.loadApp() });
      const expected = cold('-(ab)', {
        a: AppActions.getUsers(),
        b: AppActions.getStories(),
      });

      expect(loadApp$).toBeObservable(expected);
    });
  });
});
