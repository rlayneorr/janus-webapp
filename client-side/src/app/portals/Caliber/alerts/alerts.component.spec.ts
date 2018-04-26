import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { AlertsService } from '../services/alerts.service';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NotificationsService } from 'angular2-notifications-lite';


describe('AlertsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsComponent],
      providers: [AlertsService, NotificationsService]
    });
  });

  


});
