import { TestBed } from '@angular/core/testing';

import { AppActions } from '../../state/app.actions';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log the correct string depending on the payload', () => {
    const mockActiveUser = null;
    const mockType = AppActions.loadApp.type;
    const logSpy = jest.spyOn(console, 'log');

    service.log(mockActiveUser, mockType);

    expect(logSpy).toHaveBeenCalled();
  });
});
