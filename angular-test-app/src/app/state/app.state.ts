import { createFeature, createSelector } from '@ngrx/store';
import { appReducer } from './app.reducer';

export const AppFeature = createFeature({
  name: 'app',
  reducer: appReducer,
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
