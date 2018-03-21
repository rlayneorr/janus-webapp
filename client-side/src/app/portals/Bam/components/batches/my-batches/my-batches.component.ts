import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BatchService } from '../../../services/batch.service';
import { Batch } from '../../../models/batch.model';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-my-batches',
  templateUrl: './my-batches.component.html',
  styleUrls: ['./my-batches.component.css']
})
export class MyBatchesComponent implements OnInit {

  email: string;
  filterText: string;
  batches: Batch[];

  constructor(private batchService: BatchService, private sessionService: SessionService) { }

  ngOnInit() {
    this.email = this.sessionService.getUser().email;
    this.loadCurrent();
  }

  /**
   * Gets the current user's batches in progress
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  loadCurrent() {
    this.batches = null;
    this.batchService.getAllBatchesInProgress(this.email)
      .subscribe(batches => this.setbatches(batches),  err => this.batches = []);
  }

  /**
   * Gets the current user's past batches
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  loadPast() {
    this.batches = null;
    this.batchService.getPastBatches(this.email)
      .subscribe(batches => this.setbatches(batches), err => this.batches = []);
  }

  /**
   * Gets the current user's future batches
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  loadFuture() {
    this.batches = null;
    this.batchService.getFutureBatches(this.email)
      .subscribe(batches => this.setbatches(batches), err => this.batches = []);
  }

  /**
   * Sets this.batches equal to batches, or initializes this.batches as an empty list if batches is undefined
   * @param batches
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  setbatches(batches) {
    this.batches = batches;
    if (!batches) {
      this.batches = [];
    }
  }

  /**
   * Sets [this.filterText] to the text in the search box
   * @param event event.target.value holds text in search box
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  setFilterText(event) {
    this.filterText = event.target.value;
  }

}
