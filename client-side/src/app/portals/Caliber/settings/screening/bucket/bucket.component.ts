import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BucketsService } from '../services/buckets.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {

  constructor(private bucketsService: BucketsService) { }

  ngOnInit() {
      console.log(this.bucketsService.getCurrentBucket());
  }

}
