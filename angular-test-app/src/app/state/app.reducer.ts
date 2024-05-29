import { createReducer, on } from '@ngrx/store';
import { Story } from '../models/story.model';
import { User } from '../models/user.model';
import { AppActions } from './app.actions';

export interface AppState {
  activeUser: User | null;
  allUsers: User[];
  allStories: Story[];
  loading: boolean;
}

export const initialState: AppState = {
  activeUser: null,
  allUsers: [],
  allStories: [],
  loading: true,
};

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppActions.loadApp, (state): AppState => {
    return { ...state, loading: true };
  }),
  on(AppActions.loadComplete, (state): AppState => {
    return { ...state, loading: false };
  }),
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
