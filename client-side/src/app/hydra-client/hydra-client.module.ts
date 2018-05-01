import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HydraBatchService } from './services/batch/hydra-batch.service';
import { TrainerService } from './services/trainer/trainer.service';
import { UrlService } from './services/urls/url.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HydraInterceptor } from './interceptors/hydra.interceptor';
import { ErrorAlertComponent } from './ui/error-alert/error-alert.component';
import { SimpleNotificationsModule } from 'angular2-notifications-lite';
import { AlertService } from './services/alerts/alerts.service';
import { BatchService } from './aggregator/services/completebatch.service';
import { GambitSkillTypeService } from '../hydra-client/services/skillType/gambit-skill-type.service';
import { GambitSkillService } from './services/skill/gambit-skill.service';

@NgModule({
  imports: [
    HttpModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    ErrorAlertComponent
  ],
  providers: [
    HydraBatchService,
    TrainerService,
    UrlService,
    AlertService,
    BatchService,
    UrlService,
    GambitSkillService,
    GambitSkillTypeService,
    { provide: HTTP_INTERCEPTORS, useClass: HydraInterceptor, multi: true },  // interceptor for all HTTP requests
  ],
  exports: [
    ErrorAlertComponent
  ]
})
export class HydraClientModule { }
