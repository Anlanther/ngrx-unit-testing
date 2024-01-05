import { TestBed } from '@angular/core/testing';

import { StoryDataService } from './story-data.service';

describe('StoryDataService', () => {
  let service: StoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
