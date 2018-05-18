import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AssociateService } from '../../services/associates-service/associates-service';
import { Associate } from '../../models/associate.model';
import { Placement } from '../../models/placement.model';
import { ClientListService } from '../../services/client-list-service/client-list.service';
import { Client } from '../../models/client.model';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe.decorator';
import { RequestService } from '../../services/request-service/request.service';
import { HydraTrainee } from '../../../../gambit-client/entities/HydraTrainee';
import { DataScrollerModule } from 'primeng/primeng';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { PlacementService } from '../../services/placement-service/placement.service';
import { User } from '../../models/user.model';

/**
 * Component for viewing an individual associate and editing as admin.
 */
@Component({
  selector: 'form-comp',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
/** Decorator for automatically unsubscribing all observables upon ngDestory()
* Prevents memory leaks
*/
@AutoUnsubscribe
export class FormComponent implements OnInit {
  user: User = new User();
  associate: HydraTrainee = new HydraTrainee();
  clients: Client[];
  interviews: any;
  newInterview: any = {
    client: null,
    date: null,
    type: null,
    feedback: null
  };
  newStartDate: Date;
  message = '';
  selectedMarketingStatus = '';
  selectedClient = '';
  id: number;
  formOpen: boolean;
  isVP: boolean;
  placementData: Placement;

  // form booleans
  isMapped: boolean;
  eligibleForInterview: boolean;
  interviewScheduled: boolean;
  clearedAllInterviews: boolean;
  receivedEmailFromClient: boolean;
  passedBackgroundCheck: boolean;
  hasStartDate: boolean;

  /**
  *@param {AssociateService} associateService
  * Service for grabbing associate data from the back-end
  */
  constructor(
    private associateService: AssociateService,
    private clientService: ClientListService,
    private authService: AuthenticationService,
    private placementService: PlacementService
  ) { }

  ngOnInit() {
    const id = window.location.href.split('form-comp/')[1];
    this.id = Number(id);
    this.user = this.authService.getUser();
    // Role checks
    if (this.user != null && this.user.tfRoleId === 3) {
      this.isVP = true;
    } else {
      this.isVP = false;
    }
    this.getAssociate();
    this.getClients();
    this.getInterviews();
  }

  getAssociate() {
    this.associateService.getAssociate(this.id).subscribe(
      data => {
        this.associate = <HydraTrainee>data;
        this.placementService.getAllPlacementsByAssociateId(data.userId).subscribe(
          cr => {
            this.placementData = cr;
            if (this.placementData.startDate !== undefined && this.placementData.startDate.toString() === '0') {
              this.placementData.startDate = null;
            } else {
              // this.placementData.startDate = this.adjustDate(Number(this.placementData.startDate)*1000);
            }
          }
        );
      }
    );
  }

  getClients() {
    this.clientService.getAllClients().subscribe(
      data => {
        this.clients = data;
      }
    );
  }

  adjustDate(date: any) { // dates are off by 1 day - this corrects them
    // let ldate = new Date(date);
    // let origDate = ldate.getDate();
    // ldate.setDate(origDate+1);
    // if (ldate.getDate() < 1) {
    //   ldate.setMonth(ldate.getMonth() -1)
    //   ldate.setDate(origDate);
    // }
    // return ldate;
  }

  processForm() {
    // if (this.hasStartDate) {
    //   if (Date.now() < new Date(this.newStartDate).getTime())
    //   // if start date is before today, set status to MAPPED: DEPLOYED
    //     this.selectedMarketingStatus = 5;
    //   else
    //   // if start date is after today, set status to MAPPED: CONFIRMED
    //     this.selectedMarketingStatus = 4
    // }
    // else if (this.passedBackgroundCheck && this.hasStartDate) {
    //   // if background check is passed and associate has start date, set status to MAPPED: CONFIRMED
    //   this.selectedMarketingStatus = 4;
    // }
    // else if (this.clearedAllInterviews) {
    //   // if interviews are cleared, set status to MAPPED: SELECTED
    //   this.selectedMarketingStatus = 3;
    // }
    // else if (this.interviewScheduled) {
    //   // if an interview is scheduled, set status to MAPPED: RESERVED
    //   this.selectedMarketingStatus = 2;
    // }
    // else if (this.eligibleForInterview) {
    //   if (this.isMapped)
    //     // if associate is mapped and eligible for an interview, set status to MAPPED: TRAINING
    //     this.selectedMarketingStatus = 1;
    //   else
    //     // if associate is NOT mapped, set status to UNMAPPED: TRAINING
    //     this.selectedMarketingStatus = 6;
    // }
    // else if (this.isMapped) {
    //   // if associate is mapped, set status to MAPPED: TRAINING
    //   this.selectedMarketingStatus = 1;
    // }
    // else { // associate is unmapped
    //   // set status to UNMAPPED: TRAINING
    //   this.selectedMarketingStatus = 6;
    // }
    // console.log("About to update");
    // this.updatePlacement();
  }

  /**
   * Update the associate with the new client, status, and/or start date
   */
  updateAssociate() {
    if (this.selectedMarketingStatus !== '') {
      this.associate.marketingStatus = this.selectedMarketingStatus;
    }
    if (this.selectedClient !== '') {
      this.associate.client = String(this.selectedClient);
    }
    this.associateService.updateAssociate(this.associate).subscribe(
      updated => {
        this.associateService.getAssociate(this.id).subscribe(
          data => {
            this.associate = data;
          }
        );
      }
    );
  }

  updatePlacement() {
    // console.log("START DATE: "+new Date(this.newStartDate).getTime());
    // if (this.newStartDate) {
    //   var dateTime = Number((new Date(this.newStartDate).getTime())/1000);
    // } else {
    //   var dateTime = Number((new Date(this.placementData.startDate).getTime())/1000);
    // }
    // if (this.selectedMarketingStatus) {
    //   var newStatus = Number(this.selectedMarketingStatus);
    // } else {
    //   var newStatus = this.associate.marketingStatusId;
    // }
    // if (this.selectedClient) {
    //   var newClient = this.selectedClient;
    // } else {
    //   var newClient = this.associate.clientId;
    // }
    // var newPlacement = {
    //   placementId: this.placementData.placementId,
    //   clientId: this.placementData.clientId,
    //   endClientId: this.placementData.endClientId,
    //   startDate: this.placementData.startDate,
    //   endDate: this.placementData.endDate,
    //   associateId: this.placementData.associateId
    // };
    // this.placementService.updatePlacement(newPlacement).subscribe(
    //   data => {
    //     this.message = "Successfully updated placement";
    //     this.placementService.getOnePlacement(this.id).subscribe(
    //       data => {
    //         this.placementData = <Placement>data;
    //         console.log(this.placementData.startDate);
    //         if (this.placementData.startDate.toString() == "0")
    //         this.placementData.startDate = null;
    //         else
    //         this.placementData.startDate = this.adjustDate(Number(this.placementData.startDate)*1000);
    //         this.resetAllFields();
    //     });
    //   }
    // )
  }

  getInterviews() {
    // this.associateService.getInterviewsForAssociate(this.id).subscribe(
    //   data => {
    //     let tempArr = [];
    //     for (let i=0;i<data.length;i++) {
    //       let interview = data[i];
    //       let intObj = {
    //         id: interview.id,
    //         client: interview.tfClientName,
    //         date: new Date(interview.tfInterviewDate),
    //         type: interview.typeName,
    //         feedback: interview.tfInterviewFeedback
    //       }
    //       tempArr.push(intObj);
    //     }
    //     this.interviews = tempArr;
    //   }
    // )
  }

  toggleForm() {
    // this.formOpen = !this.formOpen;
  }

  addInterview() {
    // console.log(this.newInterview);
    // let interview = {
    //   associateId: this.id,
    //   clientId: this.newInterview.client,
    //   typeId: this.newInterview.type,
    //   interviewDate: new Date(this.newInterview.date).getTime(),
    //   interviewFeedback: this.newInterview.feedback
    // };
    // this.associateService.addInterviewForAssociate(this.id,interview).subscribe(
    //   data => {
    //     this.getInterviews();
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
    // this.resetAllFields();
  }

  resetAllFields() {
    // this.formOpen = false;
    // this.newInterview.client = null;
    // this.newInterview.type = null;
    // this.newInterview.date = null;
    // this.newInterview.feedback = null;
    // this.selectedClient = null;
    // this.selectedMarketingStatus = null;
  }
}
