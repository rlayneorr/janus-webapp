import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssessComponent} from './assess.component';
import {Dependencies} from '../caliber.test.module';

xdescribe('AssessComponent', () => {
  let component: AssessComponent;

  let fixture: ComponentFixture<AssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessComponent);
    component = fixture.componentInstance;
    console.log(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
