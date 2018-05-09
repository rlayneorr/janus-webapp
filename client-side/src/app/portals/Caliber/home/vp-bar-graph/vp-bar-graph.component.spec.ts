import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dependencies } from '../../../../app.test.module';
import { VpBarGraphComponent } from './vp-bar-graph.component';


// other
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { appendFile } from 'fs';

<<<<<<< HEAD
describe('VpBarGraphComponent', () => {
=======
fdescribe('VpBarGraphComponent', () => {
>>>>>>> 4da8f3f409da8ea13cf0800acb581b7e1945c7a7
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
