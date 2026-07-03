import { TestBed } from '@angular/core/testing';

import { AdressesCrud } from './adresses.crud';

describe('AdressesCrud', () => {
  let service: AdressesCrud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdressesCrud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
