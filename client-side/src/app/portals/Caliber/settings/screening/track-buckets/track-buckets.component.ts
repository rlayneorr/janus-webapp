import { Component, OnInit } from '@angular/core';
import { Track } from '../entities/Track';
import { TrackBucket } from '../entities/TrackBucket';
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-track-buckets',
  templateUrl: './track-buckets.component.html',
  styleUrls: ['./track-buckets.component.css']
})

export class TrackBucketsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  open(content) {
    this.modalService.open(content);
  }
}
