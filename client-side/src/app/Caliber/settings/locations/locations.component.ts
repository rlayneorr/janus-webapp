import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '../../entities/Location';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  private locationSubscription: Subscription;
  locations: Array<Location>;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getAll();
    this.locationSubscription = this.locationService.locations$.subscribe((resp) => {
      this.locations = resp;
    });
  }



}
