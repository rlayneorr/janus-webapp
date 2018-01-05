import { Component, OnInit, OnDestroy } from '@angular/core';
<<<<<<< HEAD
=======
import { FormGroup, FormControl, Validators } from '@angular/forms/';
>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619

// components
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// entities
import { Trainee } from '../../entities/Trainee';
<<<<<<< HEAD

// services
import { BatchService } from '../../services/batch.service';
=======
import { Panel } from '../../entities/Panel';
import { Batch } from '../../entities/Batch';


// services
import { BatchService } from '../../services/batch.service';
import { PanelService } from '../../services/panel.service';


>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css']
})
export class InterviewDetailsComponent implements OnInit, OnDestroy {

  traineeSubscription: Subscription;
  trainee: Trainee;
<<<<<<< HEAD
  batchList: any;
  batchSubscription: Subscription;
  trainingTrack: any;

  constructor(private searchBar: PanelSearchbarComponent, private batchService: BatchService) { }
=======
  batchList: Batch[];
  panelList: Panel[];
  batchSubscription: Subscription;
  trainingTrack: string;
  panelRound: number;
  interviewForm: FormGroup;

  constructor(private searchBar: PanelSearchbarComponent, private batchService: BatchService, private panelService: PanelService) { }
>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619

  ngOnInit() {
    this.traineeSubscription = this.searchBar.getTraineeSubject().subscribe((trainee) => {
      this.trainee = trainee;
    });

    this.batchSubscription = this.batchService.getList().subscribe((batchList) => {
      this.batchList = batchList;
      for (let i = 0; i < this.batchList.length; i++) {
        for (let j = 0; j < this.batchList[i].trainees.length; j++) {
          if (this.batchList[i].trainees[j].name === this.trainee.name) {
            this.trainingTrack = this.batchList[i].skillType;
            console.log(this.trainingTrack);
          }
        }
      }
    });
<<<<<<< HEAD
=======

    this.panelService.getList().subscribe((panelList) => {
      this.panelList = panelList;
      if (this.panelRound == null) {
        this.panelRound = 1;
      } else {
        this.panelRound = this.panelList.length + 1;
      }
    });

    this.interviewForm = new FormGroup({
      trainee: new FormControl(),
      interviewDate: new FormControl(),
      format: new FormControl(),
      recordingConsent: new FormControl(),
      internet: new FormControl()
    });


>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619
  }

  ngOnDestroy() {
    this.traineeSubscription.unsubscribe();
    this.batchSubscription.unsubscribe();
  }

}
