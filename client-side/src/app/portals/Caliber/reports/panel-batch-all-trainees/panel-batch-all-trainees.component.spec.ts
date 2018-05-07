import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { PanelBatchAllTraineesComponent } from './panel-batch-all-trainees.component';


describe('PanelBatchAllTraineesComponent', () => {
  let component: PanelBatchAllTraineesComponent;
  let fixture: ComponentFixture<PanelBatchAllTraineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBatchAllTraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('ngOnInit() cannot verify data (due to API calls), but should be truthy()', () => {
    component.ngOnInit();
    expect(component['dataSubscription']).toBeTruthy();
    expect(component['batchIdSub']).toBeTruthy();
  });

  fit('ngOnDestroy()', () => {
    component.ngOnDestroy();
  });
});
