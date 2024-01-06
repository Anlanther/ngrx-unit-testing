import { createActionGroup, emptyProps } from '@ngrx/store';
import { Story } from '../models/story.model';
import { User } from '../models/user.model';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Set Active User': (userName: string) => ({ userName }),
    'Get Users': emptyProps(),
    'Get Stories': emptyProps(),
    'Get Users Success': (users: User[]) => ({ users }),
    'Get Users Failure': (error: string) => ({ error }),
    'Get Stories Success': (stories: Story[]) => ({ stories }),
    'Get Stories Failure': (error: string) => ({ error }),
    'Load App': emptyProps(),
  },
});
