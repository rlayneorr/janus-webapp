import { TestBed, inject } from '@angular/core/testing';
import { ColorService } from '../colors/color.service';
import { VpHomeBarGraphService } from './vp-home-bar-graph.service';

describe('VpHomeBarGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VpHomeBarGraphService,
        ColorService
      ]
    });
  });

  it('should be created', inject([VpHomeBarGraphService], (service: VpHomeBarGraphService) => {
    expect(service).toBeTruthy();
  }));
});
