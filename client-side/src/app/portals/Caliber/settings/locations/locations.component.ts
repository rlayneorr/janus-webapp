import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../caliber-client/entities/location-entities/Location';

import {Subscription} from 'rxjs/Subscription';
import {LocationService} from '../../../../caliber-client/services/location/location.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy, OnChanges {

  private locationSubscription: Subscription;
  locations: Location[];
  currEditLocation: Location;

  constructor(private locationService: LocationService,
    private modalService: NgbModal) { }

  /**
   * get all locations on page load
   */
  ngOnInit() {
    this.locationService.getAllLocations().subscribe((resp) => {
      this.locations = resp;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.locationService.getAllLocations().subscribe((resp) => {
      this.locations = resp;
    });
  }
  /**
   * clean up subscription
   */
  ngOnDestroy() {
    if (this.locationSubscription) {
    this.locationSubscription.unsubscribe();
    }
  }

}
