import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Story } from '../models/story.model';
import { User } from '../models/user.model';
import { AppActions } from './app.actions';

export interface AppState {
  activeUser: User | null;
  allUsers: User[];
  allStories: Story[];
}

const INITIAL_STATE: AppState = {
  activeUser: null,
  allUsers: [],
  allStories: [],
};

const reducer = createReducer<AppState>(
  INITIAL_STATE,
  on(AppActions.getUsersSuccess, (state, action): AppState => {
    return { ...state, allUsers: action.users };
  }),
  on(AppActions.getStoriesSuccess, (state, action): AppState => {
    return { ...state, allStories: action.stories };
  }),
  on(AppActions.setActiveUser, (state, action): AppState => {
    return {
      ...state,
      activeUser:
        state.allUsers.find((user) => user.name === action.userName) ?? null,
    };
  })
);

export const AppFeature = createFeature({
  name: 'app',
  reducer,
  extraSelectors: ({ selectActiveUser, selectAllStories }) => ({
    selectNonFavouritedStories: createSelector(
      selectActiveUser,
      selectAllStories,
      (activeUser, allStories) =>
        activeUser
          ? allStories.filter(
              (story) =>
                !activeUser.favouriteStories.some(
                  (favStory) => favStory.title === story.title
                )
            )
          : []
    ),
    selectFavouritedStories: createSelector(
      selectActiveUser,
      (activeUser) => activeUser?.favouriteStories ?? []
    ),
  }),
});
