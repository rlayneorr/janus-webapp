import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dependencies } from '../../caliber.test.module';
import { QcDoughnutComponent } from './qc-doughnut.component';

describe('QcDoughnutComponent', () => {
  let component: QcDoughnutComponent;
  let fixture: ComponentFixture<QcDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('ngOnInit() cannot verify data currently, but the variables should be true', () => {
    component.ngOnInit();
    expect(component['dataSubscription']).toBeTruthy();
    expect(component['batchSubscription']).toBeTruthy();
  });

  // Having trouble with the download pdf
  // fit('downloadPDF()', () => {
  //   component.downloadPDF();
  // });
});
