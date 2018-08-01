import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Dependencies} from '../caliber.test.module';
import {HomeComponent} from './home.component';

xdescribe('CaliberHomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies);
    // .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
