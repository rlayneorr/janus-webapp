import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouteService } from '../../portals/Caliber/services/route.service';
import { Subscription } from 'rxjs/Subscription';
import { Routes } from '@angular/router/src/config';
import { OnDestroy } from '@angular/core/';
import { routes } from '../../portals/Caliber/caliber.routes';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caliber-nav',
  templateUrl: './caliber-nav.component.html',
  styleUrls: ['./caliber-nav.component.css'],
  providers: [RouteService],
})
export class CaliberNavComponent implements OnInit, OnDestroy {
  @Input()
  collapsed = false;

  @Output()
  collapse: EventEmitter<any> = new EventEmitter<any>();

  private routeService: RouteService;
  private routeSubscription: Subscription;
  private userRole;

  showHome = true;
  showManage: boolean;
  showAssess: boolean;
  showQuality: boolean;
  showPanel: boolean;
  showReports = true;


  constructor(private routeSrv: RouteService, private cookies: CookieService) {
  }

  ngOnInit() {
    this.userRole = this.cookies.get('role');
    this.showHome = true;
    this.showManage = this.userRole === 'ROLE_VP' || this.userRole === 'ROLE_TRAINER' ||
      this.userRole === 'ROLE_QC' || this.userRole === 'ROLE_PANEL';
    this.showAssess = this.userRole === 'ROLE_VP' || this.userRole === 'ROLE_TRAINER';
    this.showQuality = this.userRole === 'ROLE_VP' || this.userRole === 'ROLE_QC';
    this.showPanel = this.userRole === 'ROLE_VP' || this.userRole === 'ROLE_PANEL';
    this.showReports = true;
  }

  ngOnDestroy(): void {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapse.emit(this.collapsed);
  }

}
