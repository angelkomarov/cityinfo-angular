import { TestBed } from '@angular/core/testing';
import { CityInfoService } from './city-info.service';

describe('CityInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityInfoService = TestBed.get(CityInfoService);
    expect(service).toBeTruthy();
  });
});
