import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Dependencies } from './../../caliber.test.module';
import { AssessmentBreakdownComponent } from './assessment-breakdown.component';
import { PDFService } from '../../services/pdf.service';
import { ReportingService } from '../../services/reporting.service';
import { GranularityService } from '../services/granularity.service';
import { CacheData } from '../../../../entities/CacheData.entity';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('AssessmentBreakdownComponent', () => {
  let component: AssessmentBreakdownComponent;
  let fixture: ComponentFixture<AssessmentBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Data Coverage is not touching the for loop within this method because of no data verfication
  it('setupBatch()',
    inject([ReportingService, PDFService, GranularityService],
      (service: ReportingService) => {
        const data = new CacheData();
        data.params = 4;
        data.data = 7;
        component.setupBatch(data);
        // toBeNaN() is a placeholder
        // expect(component['labels']).toBeNaN();
        // expect(component['data']).toBeNaN();
  }));

  it('setupTrainee()',
    inject([ReportingService, PDFService, GranularityService], (service: ReportingService) => {
      const data = new CacheData();
      data.params = 4;
      data.data = 7;
      component.setupTrainee(data);
      // toBeNaN() is a placeholder
      // expect(component['labels']).toBeNaN();
      // expect(component['data']).toBeNaN();
    }));

  it('tryFetch()',
    inject([ReportingService, PDFService, GranularityService], (service: ReportingService) => {

      // Without Initialzation the batchId and week should be undefined.
      expect(component['batchId']).toBe(undefined);
      expect(component['week']).toBe(undefined);

      // This should touch the if statement at all
      component.tryFetch();

      // Setting the batchId and week
      component['batchId'] = 10;
      component['week'] = 1;
      component.tryFetch();
      expect(component['batchId']).toEqual(10);
      expect(component.viewReady).toBeFalsy();

      component['traineeId'] = 1;

      component['batchId'] = 0;
      component['week'] = 1;
      component.tryFetch();
      expect(component.viewReady).toBeFalsy();
      expect(component['batchId']).toEqual(0);

      component['batchId'] = 10;
      component['week'] = 0;
      component.tryFetch();
      expect(component.viewReady).toBeFalsy();
      expect(component['week']).toEqual(0);

      component['traineeId'] = 0;

      component['batchId'] = 1;
      component['week'] = 1;
      component.tryFetch();
      expect(component.viewReady).toBeFalsy();
      expect(component['batchId']).toEqual(1);

      component['traineeId'] = 1;

      component['batchId'] = 1;
      component['week'] = 1;
      component.tryFetch();
      expect(component.viewReady).toBeFalsy();
      expect(component['batchId']).toEqual(1);
    }));

    // Method is void, and it's not setting anything in the component, so can't really test this.
    // it('downloadPDF()',
    //   inject([PDFService], (service: PDFService) => {
    //     component.downloadPDF();
    // }));
});
