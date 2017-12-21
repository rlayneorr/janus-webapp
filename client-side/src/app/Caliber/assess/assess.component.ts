import { Component, OnInit, NgModule} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule  } from '@angular/common/http';
import { Batch } from '../entities/Batch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assessment } from '../entities/Assessment';


@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {

  closeResult: string;
  register= {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  };

  assessment: Assessment;
  loading = false;

  batches: Batch[] = [];
  selectedBatch: Batch = new Batch();

  constructor(private modalService: NgbModal, private batchService: BatchService) {

  }

  ngOnInit() {
    this.batchService.fetchAll();
    this.batchService.getList().subscribe(batch => this.batches = batch);
  }

  open(content) {
    this.modalService.open(content);
    this.selectedBatch = this.batches[0];
  }

  counter(i: number) {
    return new Array(i);
  }

}
