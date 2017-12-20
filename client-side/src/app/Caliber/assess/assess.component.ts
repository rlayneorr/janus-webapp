import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BatchService } from '../services/batch.service';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {

  constructor(public http: Http, public batchService: BatchService) {}

  ngOnInit() {
    // console.log('init');
    // this.batchService.fetchAll();
    // console.log(this.batchService.getList());
  }

}
