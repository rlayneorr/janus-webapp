import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// entities
import { Panel } from '../../entities/Panel';
import { GambitTrainee } from '../../../../gambit-client/entities/GambitTrainee';
import { BatchGambit } from '../../../../gambit-client/entities/BatchGambit';

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
  trainee: any; // this should be GambitTrainee/GambitTrainee but the code that was refactored to here was not correct - blake
  batchList: BatchGambit[];
  panelList: Panel[];
  batchSubscription: Subscription;
  trainingTrack: string;
  panelRound: number;

  @Input() interviewForm: FormGroup;

  /**
   *
   * @param searchBar
   * @param batchService
   * @param panelService
   */
  constructor(private searchBar: PanelSearchbarComponent, private batchService: BatchService, private panelService: PanelService) {
    this.interviewForm = new FormGroup({
      interviewDate: new FormControl(),
      panelRound: new FormControl(),
      format: new FormControl(),
      recordingConsent: new FormControl(),
      internet: new FormControl()
    });
  }

  /**
  * Sets the current trainee, gets active technologies, gets panel round for panel viewing
  *
  * @method
  */
  ngOnInit() {
    this.traineeSubscription = this.searchBar.getTraineeSubject().subscribe((trainee) => {
      this.trainee = trainee;
    });

    this.panelService.listSubject.asObservable().subscribe((panelList) => {
      this.panelList = panelList;
      if (this.panelList == null) {
        this.panelRound = 1;
      } else {
        this.panelRound = this.panelList.length + 1;
      }
    });
  }

  /**
   * Unsubscribes subscriptions
   */
  ngOnDestroy() {
    this.traineeSubscription.unsubscribe();
    this.batchSubscription.unsubscribe();
  }

}
