import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../../caliber.test.module';
import { EditlocationComponent } from './editlocation.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFactoryResolver, Injector } from '@angular/core';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { Location } from '../../../entities/Location';

fdescribe('EditlocationComponent', () => {
  let component: EditlocationComponent;
  let fixture: ComponentFixture<EditlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set state', () => {
    component.stateChange('Oregon');
    expect(component.newState).toEqual('Oregon');
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

  // it('should set state', () => {
  //   const modalService = new NgbModal({} as ComponentFactoryResolver, {} as Injector, {} as NgbModalStack);
  //   const modalService: NgbModal = {} as NgbModal;
  //   component['modalRef'] = modalService.open('', { size: 'lg' });
  //   expect(component.close(component['modalRef'])).toBeTruthy();
  //   expect(component.close('')).toBeTruthy();
  // });

  it('should call update', () => {
    const myLocation = new Location;

    component.currEditLocation = new Location;

    myLocation.company = '';
    myLocation.city = '';
    myLocation.street = '';
    component.newState = '';
    myLocation.zipcode = '123';
    component.updateLocation(myLocation);

    expect(component.currEditLocation.zipcode).toEqual('123');
  });

});
