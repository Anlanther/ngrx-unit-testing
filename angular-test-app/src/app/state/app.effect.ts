import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AppStore } from '../models/app-store.model';
import { LoggerService } from '../services/logger/logger.service';
import { StoryDataService } from '../services/story/story-data.service';
import { UserDataService } from '../services/user/user-data.service';
import { AppActions } from './app.actions';
import { AppFeature } from './app.state';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private userDataService: UserDataService,
    private storyDataService: StoryDataService,
    private loggerService: LoggerService,
    private store: Store<AppStore>
  ) {}

  loadApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadApp),
      switchMap(() => [AppActions.getUsers(), AppActions.getStories()])
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.getUsers),
      switchMap(() => this.userDataService.getUsers()),
      map((users) => AppActions.getUsersSuccess(users)),
      tap(() => AppActions.loadComplete()),
      catchError((error) => of(AppActions.getUsersFailure(error.message)))
    )
  );

  getStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.getStories),
      switchMap(() => this.storyDataService.getStories()),
      map((stories) => AppActions.getStoriesSuccess(stories)),
      catchError((error: HttpErrorResponse) =>
        of(AppActions.getStoriesFailure(error.message))
      )
    )
  );

  notification$ = createEffect(
    () =>
      this.actions$.pipe(
        concatLatestFrom(() =>
          this.store.pipe(select(AppFeature.selectActiveUser))
        ),
        tap(([action, user]) => this.loggerService.log(user, action.type))
      ),
    { dispatch: false }
  );
}
