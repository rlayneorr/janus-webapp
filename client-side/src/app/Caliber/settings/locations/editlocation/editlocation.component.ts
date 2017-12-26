import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../../../entities/Location';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../../services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.css']
})
export class EditlocationComponent implements OnInit {

  @Input()
  currEditLocation: Location;
  newCompanyName: String;
  newStreet: String;
  newCity: String;
  newZip: String;
  newState: String;

  rForm: FormGroup;

  constructor(private modalService: NgbModal,
    private locationService: LocationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      'company': [this.currEditLocation.company, Validators.required],
      'street': [this.currEditLocation.street, Validators.required],
      'city': [this.currEditLocation.city, Validators.required],
      'zipcode': [this.currEditLocation.zipcode, Validators.required],
    });
  }




  editLocation(content) {
    this.newState = this.currEditLocation.state;
    this.modalService.open(content, { size: 'lg' });
  }

  // When company was changed
  stateChange(newState) {
    this.newState = newState;
  }

  updateLocation(modal) {
    this.currEditLocation.state = this.newState;
    this.currEditLocation.company = modal.company;
    this.currEditLocation.city = modal.city;
    this.currEditLocation.street = modal.street;
    this.currEditLocation.zipcode = modal.zipcode;
    this.locationService.updateLocation(this.currEditLocation);
  }





  open(content) {
    this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
