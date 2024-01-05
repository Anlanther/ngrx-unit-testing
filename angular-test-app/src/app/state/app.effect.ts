import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { StoryDataService } from '../services/story/story-data.service';
import { UserDataService } from '../services/user/user-data.service';
import { AppActions } from './app.actions';

export const getUsers$ = createEffect(
  (actions$ = inject(Actions), userDataService = inject(UserDataService)) =>
    actions$.pipe(
      ofType(AppActions.getUsers),
      switchMap(() => userDataService.getUsers()),
      map((users) => AppActions.getUsersSuccess(users))
    ),
  { functional: true }
);

export const getStories$ = createEffect(
  (actions$ = inject(Actions), storyDataService = inject(StoryDataService)) =>
    actions$.pipe(
      ofType(AppActions.getUsers),
      switchMap(() => storyDataService.getStories()),
      map((stories) => AppActions.getStoriesSuccess(stories))
    ),
  { functional: true }
);
