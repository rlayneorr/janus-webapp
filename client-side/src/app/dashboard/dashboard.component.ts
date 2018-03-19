import { Component, OnInit } from '@angular/core';
import { App } from '../entities/App';
import { environment } from '../../environments/environment';
import { janusGlobal } from '../../environments/janusGlobal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apps: Array<App> = janusGlobal.apps;
  image_src = ['../assets/assign-force.png', '../assets/caliber.png', '../assets/track-force.png'];
  constructor(public cookieService: CookieService) { }

  ngOnInit() {
    this.cookieService.set('role', 'ROLE_VP');  // necessary for role authentication to enter Caliber
    this.image_src = ['../assets/assign-force.png', '../assets/caliber.png', '../assets/track-force.png'];
  }

}
