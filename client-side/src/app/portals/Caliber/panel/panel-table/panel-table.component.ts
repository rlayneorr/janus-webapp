import { Component, OnInit } from '@angular/core/';

// entities
import { Trainee } from '../../entities/Trainee';
import { Panel } from '../../entities/Panel';

// services
import { PanelService } from '../../services/panel.service';
import { TraineeService } from '../../services/trainee.service';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css']
})
export class PanelTableComponent implements OnInit {
  panelList: Array<Panel>;
  trainee: Trainee;
  name: string;

  /**
  * Get the necessary services
  * @constructor
  * @param traineeservice - the TraineeService
  * @param panelService - the PanelService
  */
  constructor(private panelService: PanelService, private traineeService: TraineeService) { }

  /**
   * array of all panels
   */
  ngOnInit() {

    this.panelService.listSubject.asObservable().subscribe((panelList) => {
      this.panelList = panelList;
      this.traineeService.savedSubject.asObservable().subscribe((trainee) => {
        this.trainee = trainee;
      });
    });
    if (typeof this.trainee !== 'undefined') {
      this.name = this.trainee.name;
    }
  }
}
