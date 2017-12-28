import { Component, OnInit } from '@angular/core';
import { Panel } from '../../entities/Panel';

import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-panel-feedback',
  templateUrl: './panel-feedback.component.html',
  styleUrls: ['./panel-feedback.component.css']
})
export class PanelFeedbackComponent implements OnInit {

  private panelList: Array<Panel> = null;
  private panelSubscription: Subscription;
  private granularitySubscription: Subscription;

  constructor(private granularityService: GranularityService, private panelService: PanelService) { }

  ngOnInit() {

    this.panelService.getList().subscribe((panels) => {
      if(panel) {
        this.panelList = panels;
      } else {
        this.panelService.fetchAllByTrainee
      }
    });
  }

}
