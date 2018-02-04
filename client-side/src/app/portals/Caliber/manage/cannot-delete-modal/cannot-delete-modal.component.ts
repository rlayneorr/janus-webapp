import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'app-cannot-delete-modal',
  templateUrl: './cannot-delete-modal.component.html',
  styleUrls: ['./cannot-delete-modal.component.css']
})
export class CannotDeleteModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
