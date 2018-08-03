import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CreatePanelComponent} from './create-panel.component';
import {Dependencies} from '../../caliber.test.module';
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

describe('CreatePanelComponent', () => {
  let component: CreatePanelComponent;
  let fixture: ComponentFixture<CreatePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteFeedback', () => {
    component.deleteFeedback(0);
    expect(component.panelForm.controls['feedback']).toBeTruthy();
  });

  it('should add feedback (tests all conditions)', () => {
    component.panelForm.controls['feedback'].value[0] = [];
    component.panelForm.controls['feedback'].value[1] = [];
    component.panelForm.controls['feedback'].value[2] = [];
    component.panelForm.controls['feedback'].value[3] = [];
    component.panelForm.controls['feedback'].value[2].status = 'Repanel';
    component.addFeedback();

    expect(component.panelForm.controls).toBeTruthy();
  });

  it('should call open', () => {
    component.open('');
    expect(component.modalRef).toBeTruthy();
  });

  it('should call getDismissReason if', () => {
    expect(component['getDismissReason'](ModalDismissReasons.ESC)).toBeTruthy();
  });

  it('should call getDismissReason else if', () => {
    expect(component['getDismissReason'](ModalDismissReasons.BACKDROP_CLICK)).toBeTruthy();
  });

  it('should call getDismissReason else', () => {
    expect(component['getDismissReason']('yes')).toBeTruthy();
  });

  it('should call Submit', () => {
    component.open(component.modalRef);
    component.Submit();
    expect(component.reformatDate).toBeTruthy();
  });

});
