import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  log(user: User | null, actionType: string) {
    console.log(
      `${user?.name ?? 'Unregistered'} - ${JSON.stringify(actionType)}`
    );
  }
}
