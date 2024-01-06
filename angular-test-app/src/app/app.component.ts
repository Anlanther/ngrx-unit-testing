import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from './models/app-store.model';
import { Story } from './models/story.model';
import { User } from './models/user.model';
import { AppActions } from './state/app.actions';
import { AppFeature } from './state/app.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(Store<AppStore>);
  userForm = new FormControl(null);
  userName = '';
  totalStories = 0;

  allUsers$: Observable<User[]>;
  activeUser$: Observable<User | null>;
  favouritedStories$: Observable<Story[]>;
  nonFavouritedStories$: Observable<Story[]>;

  constructor() {
    this.store.dispatch(AppActions.loadApp());

    this.allUsers$ = this.store.select(AppFeature.selectAllUsers);
    this.activeUser$ = this.store.select(AppFeature.selectActiveUser);
    this.favouritedStories$ = this.store.select(
      AppFeature.selectFavouritedStories
    );
    this.nonFavouritedStories$ = this.store.select(
      AppFeature.selectNonFavouritedStories
    );

    this.activeUser$.subscribe((user) => user && (this.userName = user.name));
  }

  userSelected() {
    const validValue = this.userForm.value;

    if (validValue) {
      this.store.dispatch(AppActions.setActiveUser(validValue));
    }
  }
}
