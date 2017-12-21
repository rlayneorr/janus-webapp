import { Component, OnInit, NgModule} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule  } from '@angular/common/http';




@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {

  constructor(public http: Http, public batchService: BatchService) {}

  ngOnInit() {
    console.log('init');
    this.batchService.fetchAllByTrainer();
    console.log(this.batchService.getList());
  }

}
