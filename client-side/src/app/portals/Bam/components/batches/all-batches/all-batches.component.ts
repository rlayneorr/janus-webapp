import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../models/batch.model';
import { BatchService } from '../../../services/batch.service';

@Component({
  selector: 'app-all-batches',
  templateUrl: './all-batches.component.html',
  styleUrls: ['./all-batches.component.css']
})
export class AllBatchesComponent implements OnInit {

  batches: Batch[];
  filterText: string;

  constructor(private batchService: BatchService) { }

  ngOnInit() {
    this.loadAll();
  }

  /**
   * Gets all batches
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  loadAll() {
    this.batchService.getBatchAll()
    .subscribe(batches => this.batches = batches, err => this.batches = []);
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
