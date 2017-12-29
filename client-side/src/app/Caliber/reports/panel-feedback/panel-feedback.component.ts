import { Component, OnInit } from '@angular/core';
import { Panel } from '../../entities/Panel';

import { GranularityService } from '../services/granularity.service';
import { PanelService } from '../../services/panel.service';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Trainee } from '../../entities/Trainee';

/**
 * Component for individual trainee's panel feedback.
 * @author Micah West
 */

@Component({
  selector: 'app-panel-feedback',
  templateUrl: './panel-feedback.component.html',
  styleUrls: ['./panel-feedback.component.css']
})
export class PanelFeedbackComponent implements OnInit {

  panelList: Array<Panel> = null;
  private panelSubscription: Subscription;
  private granularitySubscription: Subscription;
  private traineeSubscription: Subscription;

  constructor(private granularityService: GranularityService, private panelService: PanelService) { }

  ngOnInit() {

    this.granularityService.pushTrainee({
      'traineeId': 5532,
      'resourceId': null,
      'name': 'Ahmed, Sadat',
      'email': 'sadat.t.ahmed@gmail.com',
      'trainingStatus': 'Employed',
      'phoneNumber': '646-407-7707',
      'skypeId': 'sadat.t.ahmed',
      'profileUrl': 'https://app.revature.com/profile/SadatAhmed/9b198abd1d0d88022d593375b61ed041',
      'recruiterName': null,
      'college': null,
      'degree': null,
      'major': null,
      'techScreenerName': null,
      'projectCompletion': null
    });

    this.traineeSubscription = this.granularityService.currentTrainee$.subscribe((trainee) => {
      this.panelService.fetchAllByTrainee(trainee);
    });

    this.panelSubscription = this.panelService.getList().subscribe((panels) => {
      this.panelList = panels;
    });
  }
}
