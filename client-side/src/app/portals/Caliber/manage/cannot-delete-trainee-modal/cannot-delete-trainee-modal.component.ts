import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cannot-delete-trainee-modal',
  templateUrl: './cannot-delete-trainee-modal.component.html',
  styleUrls: ['./cannot-delete-trainee-modal.component.css']
})
export class CannotDeleteTraineeModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
