import { TestBed, inject } from '@angular/core/testing';
import { AlertsService } from './alerts.service';
import { Observable } from 'rxjs/Observable';

/**
 * Author: Jordan Young
 */

fdescribe('AlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertsService]
    });
  });

  it('should be created', inject([AlertsService], (service: AlertsService) => {
    expect(service).toBeTruthy();
  }));

  it('has working getMessage', inject([AlertsService], (service: AlertsService) => {
    expect(service.getMessage()).toBeTruthy();
  }));

  // test the error() in the service
  it('has working error messaging', inject([AlertsService], (service: AlertsService) => {
    service.error('this is a test');
    let msg = '';
    let type = '';
    service.getMessage().subscribe((s) => {
      type = s.type;
      msg = s.text;
      expect(msg).toBe('error');
      expect(msg).toBe('this is a test');
    });
  }));

  // test the success() in the service
  it('has working success messaging', inject([AlertsService], (service: AlertsService) => {
    service.success('this is a test');
    let msg = '';
    let type = '';
    service.getMessage().subscribe((s) => {
      type = s.type;
      msg = s.text;
      expect(msg).toBe('success1');
      expect(msg).toBe('this is a test');
    });
  }));
});
