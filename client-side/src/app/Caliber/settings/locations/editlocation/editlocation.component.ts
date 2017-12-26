import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../../../entities/Location';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../../services/location.service';

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


  constructor(private modalService: NgbModal,
    private locationService: LocationService) { }

  ngOnInit() {
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
    console.log(modal)
    this.currEditLocation.state = this.newState;
    this.currEditLocation.company = modal.company;
    this.currEditLocation.city = modal.city;
    this.currEditLocation.street = modal.street;
    this.currEditLocation.zipcode = modal.zipcode;
    console.log(this.currEditLocation);
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
