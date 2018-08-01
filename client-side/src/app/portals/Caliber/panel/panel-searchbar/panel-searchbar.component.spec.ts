import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelSearchbarComponent} from './panel-searchbar.component';
import {Dependencies} from '../../caliber.test.module';

xdescribe('PanelSearchbarComponent', () => {
  let component: PanelSearchbarComponent;
  let fixture: ComponentFixture<PanelSearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
