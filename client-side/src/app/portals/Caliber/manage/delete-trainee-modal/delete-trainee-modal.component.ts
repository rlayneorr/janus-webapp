import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Trainee} from '../../entities/Trainee';

@Component({
  selector: 'app-delete-trainee-modal',
  templateUrl: './delete-trainee-modal.component.html',
  styleUrls: ['./delete-trainee-modal.component.css']
})
export class DeleteTraineeModalComponent implements OnInit {

  @Input() trainee: Trainee;
  constructor(private activeModal: NgbActiveModal) {
    this.trainee = new Trainee();
  }

  ngOnInit() {}

  delete() {
    this.activeModal.close('Delete');
  }

  cancel() {
    this.activeModal.dismiss('nevermind');
  }

}
