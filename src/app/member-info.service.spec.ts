import { TestBed } from '@angular/core/testing';

import { MemberInfoService } from './member-info.service';

describe('MemberInfoService', () => {
  let service: MemberInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
