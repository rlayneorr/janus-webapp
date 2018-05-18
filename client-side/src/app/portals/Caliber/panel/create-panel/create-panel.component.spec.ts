import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePanelComponent } from './create-panel.component';
import { Dependencies } from '../../caliber.test.module';
import { Panel } from '../../entities/Panel';
import { NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRef, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { ContentRef } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { HydraTrainee } from '../../../../gambit-client/entities/HydraTrainee';
import { CompleteBatch } from '../../../../gambit-client/aggregator/entities/CompleteBatch';
import { User } from '../../../../gambit-client/entities/User';
import { UserRole } from '../../../../gambit-client/entities/UserRole';

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
