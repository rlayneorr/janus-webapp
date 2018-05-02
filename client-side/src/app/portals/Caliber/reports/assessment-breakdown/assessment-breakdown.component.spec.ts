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
});
