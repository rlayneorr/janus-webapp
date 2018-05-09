<<<<<<< HEAD
=======
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ApiService } from '../util/api.service';
import { PanelService } from './panel.service';
import { Injectable } from '@angular/core';

describe('PanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        PanelService,
        ApiService,
        HttpClient
      ]
    });
  });

  it('API should be accessible', inject([PanelService], (service: PanelService) => {
  }));

  it('should be created', inject([PanelService], (service: PanelService) => {
    expect(service).toBeTruthy();
  }));

  it('create should save an array of panels to the database', inject([PanelService], (service: PanelService) => {
    }));

  it('fetchAll should retrieve all panels stored on the database', inject([PanelService], (service: PanelService) => {
    }));

  it('fetchAllByTrainee should retrieve panels by trainee name', inject([PanelService], (service: PanelService) => {
    }));

  it('update should alter the panels we pushed up during create', inject([PanelService], (service: PanelService) => {
    }));

  it('delete remove the panels we pushed up during create', inject([PanelService], (service: PanelService) => {
    }));
});
>>>>>>> 4da8f3f409da8ea13cf0800acb581b7e1945c7a7
