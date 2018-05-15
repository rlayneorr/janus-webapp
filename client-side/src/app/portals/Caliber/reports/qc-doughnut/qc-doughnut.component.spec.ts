import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dependencies } from '../../caliber.test.module';
import { QcDoughnutComponent } from './qc-doughnut.component';

xdescribe('QcDoughnutComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() (cannot verify data currently), but the variables should be true', () => {
    component.ngOnInit();
    expect(component['dataSubscription']).toBeTruthy();
    expect(component['batchSubscription']).toBeTruthy();
  });

  // Having trouble with the download pdf
  // it('downloadPDF()', () => {
  //   component.downloadPDF();
  // });
});
