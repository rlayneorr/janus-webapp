import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../../services/associates-service/associates-service';
import { RequestService } from '../../services/request-service/request.service';
import { Client } from '../../models/client.model';
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe.decorator';
import { HydraTrainee } from '../../../../hydra-client/entities/HydraTrainee';

/**
 * Component for the Associate List page
 * @author Alex, Xavier
 */
@AutoUnsubscribe
@Component({
  selector: 'app-associate-list',
  templateUrl: './associate-list.component.html',
  styleUrls: ['./associate-list.component.css']
})

export class AssociateListComponent implements OnInit {
  // our collection of associates and clients
  associates: HydraTrainee[];
  clients: Client[];
  curriculums: Set<string>; // stored unique curriculums

  // used for filtering
  searchByStatus = '';
  searchByClient = '';
  searchByText = '';
  searchByCurriculum = '';

  // status/client to be updated
  updateShow = false;
  updateStatus = null;
  updateClient = null;
  updated = false;

  // used for ordering of rows
  desc = false;
  sortedColumn = '';

  public test: number[];

  constructor(
    private associateService: AssociateService,
    private requestService: RequestService
  ) {
    this.curriculums = new Set<string>();
  }

  ngOnInit() {
    // get current url
    this.getAllAssociates();
    this.getClientNames();

    const url = window.location.href.split('/');
    if (url.length === 8) { // if values passed in, search by values
      if (url[4] === 'client') {
        this.searchByClient = url[5];
      } else if (url[4] === 'curriculum') {
        this.searchByCurriculum = url[5];
      }
       this.searchByStatus = url[6].toUpperCase() + ',  ' + url[7].toUpperCase();
    }
  }

  /**
   * Set our array of all associates
   */
  getAllAssociates() {
    const self = this;
    this.associateService.getAllAssociates().subscribe(data => {
      this.associates = data;
      this.sort('userId');
    });
  }

  /**
   * Fetch the client names
   */
  getClientNames() {
    this.requestService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  /**
   * Sort the array of clients based on a given input.
   * @param property to be sorted by
   */
  sort(property) {
    this.desc = !this.desc;
    let direction;
    if (property !== this.sortedColumn || this.updated) {
      // set ascending or descending
      direction = 1;
    } else {
      direction = this.desc ? 1 : -1;
    }

    this.sortedColumn = property;

    if (this.updated) {
      this.updated = false;
    }

    // sort the elements
    this.associates.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  /**
   * Bulk edit feature to update associate's statuses and clients.
   */
  updateAssociates() {
    const trainees: HydraTrainee[] = [];
    const self = this;

    for (const trainee of this.associates) { // grab the checked ids
      const check = <HTMLInputElement>document.getElementById(trainee.userId.toString());
      if (check != null && check.checked) {
        if (this.updateStatus !== null) {
          trainee.marketingStatus = this.updateStatus;
        }
        if (this.updateClient !== null) {
          trainee.client = this.updateClient;
        }
        trainees.push(trainee);
      }
    }
    let count = 1;
    for (const trainee of trainees) {
      this.associateService.updateAssociate(trainee).subscribe(
        data => {
          if (count++ === trainees.length) {
            self.getAllAssociates();
            self.updated = true;
          }
        }
      );
    }
  }
}
