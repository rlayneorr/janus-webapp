import { Component, OnInit } from '@angular/core';
import { Batch } from '../entities/Batch';
import { NoteService } from '../services/note.service';
import { BatchService } from '../services/batch.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {

  batches: Batch[];
  currentBatch: Batch;
  currentYear: number;


  constructor(private noteService: NoteService, private batchService: BatchService) {
    this.batchService.fetchAll();
    this.batchService.getList().subscribe( (batches) => {
      this.batches = batches;
      this.currentBatch = this.batches[0];
    });
  }

  ngOnInit() {
    this.getCurrentYearFromCurrentBatch();
  }

  getCurrentYearFromCurrentBatch() {
    this.currentYear = this.currentBatch.startDate.getFullYear();
  }


}
