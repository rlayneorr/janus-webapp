import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BamNavComponent } from './bam-nav.component';

describe('BamNavComponent', () => {
  let component: BamNavComponent;
  let fixture: ComponentFixture<BamNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BamNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BamNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
