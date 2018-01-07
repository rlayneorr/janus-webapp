import { Component, OnInit } from '@angular/core/';

// entities
import { Trainee } from '../../entities/Trainee';
import { Panel } from '../../entities/Panel';

// services
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css']
})
export class PanelTableComponent implements OnInit {
  panelList: Array<Panel>;
  trainee: Trainee;

  /**
  * Get the necessary services
  * @constructor
  * @param traineeservice - the TraineeService
  * @param panelService - the PanelService
  */
  constructor(private panelService: PanelService) {  }

  ngOnInit() {
    /**
     * @property {Array} panelList   - array of all panels
     */

    this.panelService.getList().subscribe((panelList) => {
      this.panelList = panelList;
<<<<<<< HEAD
      // console.log(this.panelList);
=======
      console.log(this.panelList);
>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619
    });
  }

  /**
   * Sets the current trainee for panel viewing
   *
   * @method
   * @param  $event - A trainee selection event
   * @listens PanelSearchBarComponent#Trainee
   */
}
