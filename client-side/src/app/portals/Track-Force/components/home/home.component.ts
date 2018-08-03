import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';
import { ChartsModule, Color } from 'ng2-charts';
import { CreateUserService } from '../../services/create-user-service/create-user.service';
import { AssociateService } from '../../services/associates-service/associates-service';
import { ClientListService } from '../../services/client-list-service/client-list.service';
import { BatchService } from '../../services/batch-service/batch.service';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import {ThemeConstants} from '../../constants/theme.constants';
import {ChartOptions} from '../../models/ng2-charts-options.model';
import '../../constants/selected-status.constants';
import { SelectedStatusConstants } from '../../constants/selected-status.constants';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../services/authentication-service/authentication.service';
import { MarketStatusService } from '../../services/market-status/market-status.service';
import { MarketingStatus } from '../../models/marketing-status.model';

const MONTHS_3 = 788923800;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private associates: any;

  /**
 * http://usejsdoc.org/
 */

 // Message from the back-end
  dbMessage: string;
  myStatus: string;
  username: string;
  labels = [];
  data = [];
  amountType: any;

  // Variables for chart settings
  undeployedLabels = SelectedStatusConstants.UNDEPLOYED_LABELS;
  mappedLabels = SelectedStatusConstants.MAPPED_LABELS;
  unmappedLabels = SelectedStatusConstants.UNMAPPED_LABELS;
  deployedLabels = SelectedStatusConstants.DEPLOYED_LABELS;

  mappedColors: Array<Color> = ThemeConstants.MAPPED_COLORS;
  clientColors: Array<Color> = ThemeConstants.CLIENT_COLORS;
  skillColors: Array<Color> = ThemeConstants.SKILL_COLORS;

  deployedChartType = 'pie';
  undeployedChartType = 'pie';
  mappedChartType = 'pie';
  unmappedChartType = 'pie';

  private options = ChartOptions.createOptionsLegend('right');

  unmappedOptions = ChartOptions.createOptionsTitle('Unmapped', 24, '#121212', 'right');
  mappedOptions = ChartOptions.createOptionsTitle('Mapped', 24, '#121212', 'right');
  deployedOptions = ChartOptions.createOptionsTitle('Mapped vs. Unmapped (Deployed)', 24, '#121212', 'right');
  undeployedOptions = ChartOptions.createOptionsTitle('Mapped vs. Unmapped (Not Deployed)', 24, '#121212', 'right');
  // end of chart settings

  // populate with dummy data to enable chart labels by default
  private undeployedData: number[] = [0, 0];
  private deployedData: number[] = [0, 0];
  private mappedData: number[] = [0, 0, 0, 0];
  private unmappedData: number[] = [0, 0, 0, 0];
  private user: User;


  /**
    *@param {RequestService} rs
    * Service for handling requests to the back-end
    *
    *@param {Router} rout
    * Allows for re-direction to other components
    */
  constructor(
    private rs: RequestService,
    private rout: Router,
    private us: CreateUserService,
    private cs: ClientListService,
    private bs: BatchService,
    private as: AssociateService,
    private ms: MarketStatusService,
    private authenticationService: AuthenticationService
  ) {
    const user = this.authenticationService.getUser();
    if (user) {
      this.user = user;
    }
  }

  ngOnInit() {
    const user = this.authenticationService.getUser();
    if (user) {
      this.user = user;
    }
    // if(!this.user){
    //   this.rout.navigateByUrl('TrackForce/login').catch(error=>{console.log(error)});
    // }
    this.load();
  }

  load() {
    this.as.getAllAssociates().subscribe(response => {
      // console.log(response);
      this.associates = response;
      let trainingMapped = 0;
      let trainingUnmapped = 0;
      let reservedMapped = 0;
      let openUnmapped = 0;
      let selectedMapped = 0;
      let selectedUnmapped = 0;
      let confirmedMapped = 0;
      let confirmedUnmapped = 0;
      let deployedMapped = 0;
      let deployedUnmapped = 0;

      for (let i = 0; i < this.associates.length; i++) {
        // iterate over associates and aggregate totals
        const associate = this.associates[i];
        switch (associate.marketingStatusId) {
          case 1: trainingMapped++; break;
          case 2: reservedMapped++; break;
          case 3: selectedMapped++; break;
          case 4: confirmedMapped++; break;
          case 5: deployedMapped++; break;
          case 6: trainingUnmapped++; break;
          case 7: openUnmapped++; break;
          case 8: selectedUnmapped++; break;
          case 9: confirmedUnmapped++; break;
          case 10: deployedUnmapped++; break;
        }
      }
      /**
       * @member {Array} UndeployedData
       * @description UndeployedData is an array used to populate the
       * dataset of the Undeployed chart. The dataset contains two numbers:
       * the mapped number is the sum of all mapped associates, the unmapped number
       * is the sum of all unmapped associates.
       */
      const undeployedArr: number[] = [trainingMapped
        + reservedMapped + selectedMapped + confirmedMapped,
      trainingUnmapped + openUnmapped + selectedUnmapped + confirmedUnmapped];

      this.undeployedData = undeployedArr;

      /**
       * @member {Array} MappedData
       * @description MappedData is an array that stores the
       * data for the dataset of the Mapped chart.
       * The dataset contains four numbers: <br>
       * training mapped <br>
       * reserved mapped <br>
       * selected mapped <br>
       * confirmed mapped<br>
       */
      const mappedArr: number[] = [trainingMapped, reservedMapped, selectedMapped, confirmedMapped];

      this.mappedData = mappedArr;

      /**
       * @member {Array} UnmappedData
       * @description UnmappedData is an array that stores the
       * data for the dataset of the Unmapped chart.
       * The dataset contains four numbers: <br>
       * training unmapped <br>
       * open unmapped <br>
       * selected unmapped <br>
       * confirmed unmapped<br>
       */
      const unmappedArr: number[] = [trainingUnmapped, openUnmapped, selectedUnmapped, confirmedUnmapped];

      this.unmappedData = unmappedArr;

      /**
       * @member {Array} DeployedData
       * @description DeployedData is an array used to populate the
       * dataset of the Deployed chart. The dataset contains two numbers:
       * the mapped number is the sum of all mapped associates, the unmapped number
       * is the sum of all unmapped associates. Both numbers contain only deployed associates.
       */
      const deployedArr = [deployedMapped, deployedUnmapped];

      this.deployedData = deployedArr;
    });
  }

  /**
* @function MappedOnClick
* @description When the "Mapped" chart is clicked
* the global variable selectedStatus is
* set to the label of the slice
* clicked.
*/
  mappedOnClick(evt: any) {
    if (evt.active[0] !== undefined) {
      // navigate to client-mapped component
      this.rout.navigate([`TrackForce/client-mapped/${evt.active[0]._index}`]);
    }
  }
  /**
   * @function UnmappedOnClick
   * @description When the "Unmapped" chart is clicked
   * the global variable selectedStatus is
   * set to the label of the slice
   * clicked.
   */
  unmappedOnClick(evt: any) {
    if (evt.active[0] !== undefined) {
      // navigate to skillset component
      this.rout.navigate([`TrackForce/skillset/${evt.active[0]._index}`]);
    }
  }

  /**
   * @function populateDB
   * @description Populates the database with information from
   *              data script
   */
  populateDB() {
    this.rs.populateDB().subscribe(response => {
      this.load();
    }, err => {
      console.log('err');
    });
  }

  /**
   * @function deleteDB
   * @description Truncates all the tables in the database
   */
  deleteDB() {
    this.rs.deleteDB().subscribe(response => {
      this.load();
    }, err => {
      console.log('err');
    });
  }

  /**
   * @function populateDBSF
   * @description SF Populates the database with information
   *              from data script
   * For Salesforce data integration
   */
  populateDBSF() {
    this.rs.populateDBSF().subscribe(response => {
      this.load();
    }, err => {
      console.log('err');
    });
  }

  /**
  * http://usejsdoc.org/
  */

  /**
   * @function getUsername
   * @description This function will return a JavaScript object that contains
   *				the username for the current user that logs in
   */
  getUsername() {
    this.us.getUsername().subscribe(response => {
      this.username = response.data;
    });
  }

  private threeMonthsBefore(): number {
    return new Date().getTime() - MONTHS_3;
  }

  private threeMonthsAfter(): number {
    return new Date().getTime() + MONTHS_3;
  }

  public getUndeployedData(): number[] {
    return this.undeployedData;
  }

  public getDeployedData(): number[] {
    return this.deployedData;
  }

  public getMappedData(): number[] {
    return this.mappedData;
  }

  public getUnmappedData(): number[] {
    return this.unmappedData;
  }
}
