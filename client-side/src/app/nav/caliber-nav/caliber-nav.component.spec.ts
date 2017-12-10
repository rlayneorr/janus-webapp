import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliberNavComponent } from './caliber-nav.component';

describe('CaliberNavComponent', () => {
  let component: CaliberNavComponent;
  let fixture: ComponentFixture<CaliberNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaliberNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaliberNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
