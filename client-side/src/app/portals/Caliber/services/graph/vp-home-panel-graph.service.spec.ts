import { TestBed, inject } from '@angular/core/testing';
import { ColorService } from '../colors/color.service';
import { VpHomePanelGraphService } from './vp-home-panel-graph.service';

describe('VpHomePanelGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VpHomePanelGraphService,
        ColorService
      ]
    });
  });

  it('should be created', inject([VpHomePanelGraphService], (service: VpHomePanelGraphService) => {
    expect(service).toBeTruthy();
  }));
});
