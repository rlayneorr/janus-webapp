import { Component, OnInit, Input } from '@angular/core';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { AlertsService } from '../services/alerts.service';
import { NotificationsService } from 'angular2-notifications-lite';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {

  message: any;

  /**
   * Global config for notifications
   */
  public options = {
    position: ['bottom', 'left'],
    timeOut: 2500,
    maxStack: 10,
    maxLength: 36,
    lastOnBottom: true,
    showProgressBar: false,
    preventDuplicates: true,
  };

  constructor(
    private alertService: AlertsService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.showNotification();
  }

  /**
   * Gets a message from AlertService and displays the appropriate notification
   * depending on whether message is a success or error
   */
  showNotification() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      if (this.message.type === 'success') {
        this.notificationService.success('Success', this.message.text);
      } else {
        this.notificationService.error('Error', this.message.text);
      }
    });
  }
}
