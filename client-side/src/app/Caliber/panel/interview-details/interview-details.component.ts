import { Component, OnInit, OnDestroy } from '@angular/core';

// components
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// entities
import { Trainee } from '../../entities/Trainee';

// services
import { BatchService } from '../../services/batch.service';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css']
})
export class InterviewDetailsComponent implements OnInit, OnDestroy {

  traineeSubscription: Subscription;
  trainee: Trainee;
  batchList: any;
  panelList: any;
  batchSubscription: Subscription;
  trainingTrack: any;
  panelRound: any;

  constructor(private searchBar: PanelSearchbarComponent, private batchService: BatchService, private panelService: PanelService) { }

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

    this.panelService.getList().subscribe((panelList) => {
      this.panelList = panelList;
      if (this.panelRound == null) {
        this.panelRound = 1;
      } else {
        this.panelRound = this.panelList.length + 1;
      }
    });
  }

  ngOnDestroy() {
    this.traineeSubscription.unsubscribe();
    this.batchSubscription.unsubscribe();
  }

}
