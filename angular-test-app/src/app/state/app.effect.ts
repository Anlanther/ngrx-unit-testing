import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AppStore } from '../models/app-store.model';
import { StoryDataService } from '../services/story/story-data.service';
import { UserDataService } from '../services/user/user-data.service';
import { AppActions } from './app.actions';
import { AppFeature } from './app.state';

export const loadApp$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AppActions.loadApp),
      switchMap(() => [AppActions.getUsers(), AppActions.getStories()])
    ),
  { functional: true }
);

export const getUsers$ = createEffect(
  (actions$ = inject(Actions), userDataService = inject(UserDataService)) =>
    actions$.pipe(
      ofType(AppActions.getUsers),
      switchMap(() => userDataService.getUsers()),
      map((users) => AppActions.getUsersSuccess(users)),
      catchError((error) => of(AppActions.getUsersFailure(error)))
    ),
  { functional: true }
);

export const getStories$ = createEffect(
  (actions$ = inject(Actions), storyDataService = inject(StoryDataService)) =>
    actions$.pipe(
      ofType(AppActions.getStories),
      switchMap(() => storyDataService.getStories()),
      map((stories) => AppActions.getStoriesSuccess(stories)),
      catchError((error) => of(AppActions.getStoriesFailure(error)))
    ),
  { functional: true }
);

export const notification$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store<AppStore>)) =>
    actions$.pipe(
      concatLatestFrom(() => store.pipe(select(AppFeature.selectActiveUser))),
      tap(([action, user]) =>
        console.log(
          `${user?.name ?? 'Unregistered'} - ${JSON.stringify(action.type)}`
        )
      )
    ),
  { dispatch: false, functional: true }
);
