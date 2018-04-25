import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MyBatchesComponent } from './my-batches.component';
import { Dependencies } from '../../../bam.test.module';
import { filter } from 'rxjs/operator/filter';
import { Batch } from '../../../models/batch.model';

fdescribe('MyBatchesComponent', () => {
  let component: MyBatchesComponent;
  let fixture; // : ComponentFixture<MyBatchesComponent>;

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

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if setFilterText is called when the change event is fired.
   */
  it ('should run setFilterText when a change is made to the filter text', async(() => {

    const filterElement = fixture.debugElement.query(By.css('.pull-right'));

    spyOn(component, 'setFilterText');

    filterElement.triggerEventHandler('change', 'This is a Unit Test');

    fixture.whenStable().then(() => {
      expect(component.setFilterText).toHaveBeenCalled();
    });
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if filterText is set to value of event target
   */
  it ('should set filterText to "This is a Unit Test"', async(() => {

    const filterElement = fixture.debugElement.query(By.css('.pull-right')).nativeElement;

    filterElement.value = 'This is a Unit Test';

    const event = { target: filterElement };

    component.setFilterText(event);

    fixture.whenStable().then(() => {
      expect(component.filterText).toEqual('This is a Unit Test');
    });
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batches to an empty array if input is undefined.', () => {
    component.setbatches(undefined);

    expect(component.batches).toEqual([]);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batches to an empty array if input is null.', () => {
    component.setbatches(null);

    expect(component.batches).toEqual([]);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batches equal to an input batch array.', () => {
     const batches: Array<Batch> = [
      new Batch(0, null, null, null, null, 0, 0),
      new Batch(0, null, null, null, null, 0, 0),
      new Batch(0, null, null, null, null, 0, 0),
      new Batch(0, null, null, null, null, 0, 0),
      new Batch(0, null, null, null, null, 0, 0),
     ];

     component.setbatches(batches);

     expect(component.batches).toEqual(batches);
  });
});
