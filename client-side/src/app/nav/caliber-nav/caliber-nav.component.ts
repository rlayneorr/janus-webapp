import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

// services
import { RouteService } from '../../Caliber/services/route.service';


@Component({
  selector: 'app-caliber-nav',
  templateUrl: './caliber-nav.component.html',
  styleUrls: ['./caliber-nav.component.css']
})

export class CaliberNavComponent implements OnInit {
  private routeService: RouteService;

  constructor(routeSrv: RouteService) {
    this.routeService = routeSrv;
  }

  public getRoutes(): Routes {
    return this.routeService.getTopNavRoutes();
  }

  ngOnInit() {
  }

}
