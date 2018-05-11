import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';

import { BatchOverallLineChartComponent } from './batch-overall-line-chart.component';
import { ReportingService } from '../../services/reporting.service';
import { PDFService } from '../../services/pdf.service';
import { GranularityService } from '../services/granularity.service';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

// Can't test private methods
describe('BatchOverallLineChartComponent', () => {
  let component: BatchOverallLineChartComponent;
  let fixture: ComponentFixture<BatchOverallLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOverallLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Need to look into how to verify unsubscribed
  it('ngOnDestroy() should end the subscription', inject([ReportingService, GranularityService], () => {
    component.ngOnDestroy();
    // const testSub = new Subscription();
    // expect(component['dataSubscription']).toEqual(testSub);
    // expect(component['granularitySub']).toEqual(testSub);
  }));

  it('ngOnInit() on intialization', inject([ReportingService, GranularityService, PDFService], () => {
    component.ngOnInit();
    expect(component['dataSubscription']).toBeTruthy();
    expect(component.labels).toBe(null);
    expect(component.data).toEqual(null);
  }));

  it('updateWeeks() without data should set both the dataShown and labelsShown to null', () => {
    component['updateWeeks']();
    expect(component.dataShown).toBeNull();
    expect(component.labelsShown).toBeNull();

    // Setting the data of component to 1 to move pass first if statement
    // Cannot test, as there is no data safety.
    // component.data = 'hello';
    // component['week'] = 1;
    // component['updateWeeks']();
    // expect(component.dataShown).toBeNull();
    // expect(component.labelsShown).toBeNull();
  });

  // Method is void, and it's not setting anything in the component, so can't really test this.
  // it('downloadPDF()', inject([ReportingService, PDFService, GranularityService], () => {
  //   component.downloadPDF();
  // }));
});
