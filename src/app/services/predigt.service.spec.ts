import { TestBed } from '@angular/core/testing';

import { PredigtService } from './predigt.service';

describe('PredigtService', () => {
  let service: PredigtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredigtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
