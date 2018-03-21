import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomComponent } from './boom.component';
import { Dependencies } from '../../bam.test-observable.module';

describe('BoomComponent', () => {
  let component: BoomComponent;
  let fixture: ComponentFixture<BoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
