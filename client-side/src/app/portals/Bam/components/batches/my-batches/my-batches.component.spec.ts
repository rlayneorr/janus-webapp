import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MyBatchesComponent } from './my-batches.component';
import { Dependencies } from '../../../bam.test.module';

describe('MyBatchesComponent', () => {
  let component: MyBatchesComponent;
  let fixture: ComponentFixture<MyBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author David Graves
   * @batch 1712
   * Tests if method is called when div is clicked on.
   */
  it('should call loadPast() when div is clicked', async(() => {
    spyOn(component, 'loadPast');

    const loadPastDiv = fixture.debugElement.query(By.css('#loadPast')).nativeElement;
    loadPastDiv.click();

    fixture.whenStable().then(() => {
      expect(component.loadPast).toHaveBeenCalled();
    });
  }));

  /**
   * @author David Graves
   * @batch 1712
   * Tests if method is called when div is clicked on.
   */
  it('should call loadCurrent() when div is clicked', async(() => {
    spyOn(component, 'loadCurrent');

    const loadCurrentDiv = fixture.debugElement.query(By.css('#loadCurrent')).nativeElement;
    loadCurrentDiv.click();

    fixture.whenStable().then(() => {
      expect(component.loadCurrent).toHaveBeenCalled();
    });
  }));

  /**
   * @author David Graves
   * @batch 1712
   * Tests if method is called when div is clicked on.
   */
  it('should call loadFuture() when div is clicked', async(() => {
    spyOn(component, 'loadFuture');

    const loadFutureDiv = fixture.debugElement.query(By.css('#loadFuture')).nativeElement;
    loadFutureDiv.click();

    fixture.whenStable().then(() => {
      expect(component.loadFuture).toHaveBeenCalled();
    });
  }));
});
