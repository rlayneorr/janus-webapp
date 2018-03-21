import { Component, OnInit } from '@angular/core';

import { BatchService } from '../../../services/batch.service';
import { Observable } from 'rxjs/Observable';
import { Batch } from '../../../models/batch.model';
import { CalendarService } from '../../../services/calendar.service';
import { Subtopic } from '../../../models/subtopic.model';
import { ListModel } from '../../../models/list.model';
import { SubtopicName } from '../../../models/subtopicname.model';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SessionService } from '../../../services/session.service';

/**
 * @author John Austin -  batch: 1712-dec11-Java-Steve
 */
@Component({
  selector: 'app-batch-progress-bar',
  templateUrl: './batch-progress-bar.component.html',
  styleUrls: ['./batch-progress-bar.component.css']
})
export class BatchProgressBarComponent implements OnInit, OnChanges {

  batchObs: Observable<Batch>;
  batchId: number;
  batch: Batch;
  batchName: string;
  showSpinner = true;
  batchStart: Date;
  batchEnd: Date;
  subTopicCompleted: number;
  subTopicTotal: number;
  subTopicTotalObs: Observable<number>;
  percentCompleted: number;
  subPercentCompleted: number;
  currentDate: Date;
  completedDate: number;
  missedTopics: number;
  totalTopics: number;
  subTopicsCompleted: number;
  subTopicObs: Observable<Subtopic[]>;
  subTopics: Subtopic[];
  subTopicMissed: number;
  topicArray: ListModel[];
  batchIdObs: Observable<number>;
  constructor(private batchService: BatchService, private calendarService: CalendarService,
     private sessionService: SessionService) {

      this.batchId = null;
   }
   ngOnChanges() {

   }
  ngOnInit() {
    this.sessionService.selectedBatchSubject.subscribe(data =>  {
      this.batchId = data.id;
      this.batchObs = this.batchService.getBatchById(this.batchId);
      this.subTopicObs = this.calendarService.getSubtopicsByBatch(this.batchId);
      this.subTopicTotalObs = this.calendarService.getNumberOfSubTopicsByBatch(this.batchId);
      this.batchObs.subscribe(
        data1 => {
          this.showSpinner = false;
          this.batch = data1;
          this.currentDate = new Date();
          if ((this.currentDate.valueOf() - this.batch.startDate.valueOf() >
              this.batch.endDate.valueOf() - this.batch.startDate.valueOf())) {
              this.completedDate = this.batch.endDate.valueOf() - this.batch.startDate.valueOf();
          }else {
            this.completedDate = (this.currentDate.valueOf() - this.batch.startDate.valueOf());
          }
          this.percentCompleted = Math.floor(this.completedDate.valueOf() /
            (this.batch.endDate.valueOf() - this.batch.startDate.valueOf()) * 100);
        });
      this.subTopicObs.subscribe(
        data2 => {
          this.subTopics = null;
          this.subTopics = data2;
          this.topicArray = [];
          if (this.subTopics == null) {
            this.subTopicCompleted = null;
            this.subTopicMissed = 0;
          }else {
            this.subTopicMissed = 0;
            this.subTopicCompleted = 0;
            this.subPercentCompleted = 0;
            this.subTopicTotal = data2.length;
            for (let i = 0; i < data2.length; i++) {
              if ( data2[i].status.id === 2 || data2[i].status.id === 3) {
                this.subTopicCompleted += 1;
              }
              if ( data2[i].status.id === 4) {
                const subTopicName = data2[i].subtopicName.name;
                const topicName = data2[i].subtopicName.topic.name;
                this.subTopicMissed += 1;
                if (data2[i].subtopicName.topic) {
                  // if topicArray is null;
                  if (this.topicArray == null) {
                    const listModel = new ListModel(topicName);
                    listModel.listItems.push(subTopicName);
                    this.topicArray.push(listModel);
                  }
                 let topicNameExists = false;
                  for (let j = 0; j < this.topicArray.length; j++) {
                    if (this.topicArray[j].listName === topicName) {
                      topicNameExists = true;
                      this.topicArray[j].listItems.push(subTopicName);
                    }
                  }
                  if (!topicNameExists) {
                    const listModel = new ListModel(topicName);
                    listModel.listItems.push(subTopicName);
                    this.topicArray.push(listModel);
                  }
                }
              }
              // subtopic percent complete
            this.subPercentCompleted = Math.floor((this.subTopicCompleted * 100) / this.subTopicTotal);
          }
        }}
      );
      this.subTopicTotalObs.subscribe(
        data3 => {
          this.subTopicTotal = data3;
        }
      );
      // find subtomics completed
      this.subTopicCompleted = 0;
    });

    if ( this.sessionService.getSelectedBatch() != null) {
      this.sessionService.putSelectedBatchIntoSession(this.sessionService.getSelectedBatch());
    }
  }
}
