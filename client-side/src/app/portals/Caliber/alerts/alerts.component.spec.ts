import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { AlertsService } from '../services/alerts.service';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications-lite';
import { Dependencies } from '../caliber.test.module';


fdescribe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsComponent],
      imports: [SimpleNotificationsModule],
      providers: [AlertsService, NotificationsService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show error', inject([AlertsService, NotificationsService],
    (aService: AlertsService, nService: NotificationsService) => {
      aService.error('this is a test');
      component.showNotif();
      expect(component.message.text).toBe('this is a test');
  }));

  it('should show success', inject([AlertsService, NotificationsService],
    (aService: AlertsService, nService: NotificationsService) => {
      aService.success('this is a test');
      component.showNotif();
      expect(component.message.text).toBe('this is a test');
  }));
});
