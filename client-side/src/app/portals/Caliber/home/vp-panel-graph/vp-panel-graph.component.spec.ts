import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Injectable, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http/';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { VpHomePanelGraphService } from '../../services/graph/vp-home-panel-graph.service';
import { AlertsService } from '../../services/alerts.service';
import { ReportsService } from '../../services/reports.service';
import { ColorService } from '../../services/colors/color.service';

import { VpPanelGraphComponent } from './vp-panel-graph.component';
import { HomeComponent } from '../../../Assign-Force/home/home.component';

xdescribe('VpPanelGraphComponent', () => {
  let component: VpPanelGraphComponent;
  let fixture: ComponentFixture<VpPanelGraphComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpPanelGraphComponent ],
      imports: [
        ChartsModule,
        HttpClientModule
      ],
      providers: [
        ColorService,
        VpHomePanelGraphService,
        AlertsService,
        ReportsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpPanelGraphComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeDefined('VPPANEL NOT DEFINED');
      expect(component).toBeTruthy('VPPANEL NOT TRUTHY');
      expect(component).toBeTruthy();
  });
});
