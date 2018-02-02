import { TestBed, inject } from '@angular/core/testing';
import { ColorService } from '../colors/color.service';
import { VpHomeLineGraphService } from './vp-home-line-graph.service';

describe('VpHomeLineGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VpHomeLineGraphService,
        ColorService
      ]
    });
  });

  it('should be created', inject([VpHomeLineGraphService], (service: VpHomeLineGraphService) => {
    expect(service).toBeTruthy();
  }));
});
