import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AlertsService} from './alerts.service';
import {TrainerService} from './trainer.service';

xdescribe('TrainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        TrainerService,
        HttpClient,
        AlertsService
      ]
    });
  });

  it('should be created', inject([TrainerService], (service: TrainerService) => {
    expect(service).toBeTruthy();
  }));
});
