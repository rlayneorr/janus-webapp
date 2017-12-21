import { Component, OnInit, NgModule} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule  } from '@angular/common/http';
import { Batch } from '../entities/Batch';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {

  batches: Batch[] = [];

  constructor(private batchService: BatchService) {

  }

  ngOnInit() {
    this.batchService.fetchAll();
    console.log('fetched');

    this.batchService.getList().subscribe(batch => this.batches = batch);
    console.log('subbed');
    console.log(this.batches);
  }

}
