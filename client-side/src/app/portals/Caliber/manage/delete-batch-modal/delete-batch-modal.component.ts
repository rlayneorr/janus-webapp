import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { HydraBatch } from '../../../../hydra-client/entities/HydraBatch';
import { CompleteBatch } from '../../../../hydra-client/aggregator/entities/CompleteBatch';

@Component({
  selector: 'app-delete-batch-modal',
  templateUrl: './delete-batch-modal.component.html',
  styleUrls: ['./delete-batch-modal.component.css']
})
export class DeleteBatchModalComponent implements OnInit {

  @Input() batch: CompleteBatch;
  constructor(private activeModal: NgbActiveModal) {
    this.batch = new CompleteBatch();
  }

  ngOnInit() {
  }

  delete() {
    this.activeModal.close('Delete');
  }

  cancel() {
    this.activeModal.dismiss('nevermind');
  }

}
