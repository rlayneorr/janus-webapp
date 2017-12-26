// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavModule } from '../nav/nav.module';

// routing
import { routes } from './caliber.routes';
import { SpringInterceptor } from './interceptors/spring.interceptor';

// services
import { BatchService } from './services/batch.service';
import { TrainerService } from './services/trainer.service';
import { TraineeService } from './services/trainee.service';
import { EnvironmentService } from './services/environment.service';
import { AssessmentService } from './services/assessment.service';
import { RouteService } from './services/route.service';
import { PanelService } from './services/panel.service';
import { GradeService } from './services/grade.service';

// components
import { CaliberComponent } from './caliber.component';
import { HomeComponent } from './home/home.component';
import { AssessComponent } from './assess/assess.component';
import { NavComponent } from '../nav/nav.component';
import { ManageComponent } from './manage/manage.component';
import { ReportsComponent } from './reports/reports.component';
import { WeeklyLineChartComponent } from './weekly-line-chart/weekly-line-chart.component';
import { TraineeTechSkillsComponent } from './reports/trainee-tech-skills/trainee-tech-skills.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RadarComponent } from './radar-test/radar-test.component';
import { HttpClient } from '@angular/common/http';
import { TestComponent } from './components/test/test.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    ChartsModule,
  ],
  declarations: [
    CaliberComponent,
    HomeComponent,
    AssessComponent,
    ManageComponent,
    ReportsComponent,
    WeeklyLineChartComponent,
    RadarComponent,
    TraineeTechSkillsComponent,
    TestComponent,
  ],
  exports: [
    TraineeTechSkillsComponent,
    RadarComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpringInterceptor, multi: true },  // interceptor for all HTTP requests
    BatchService,
    EnvironmentService,
    TrainerService,
    TraineeService,
    AssessmentService,
    RouteService,
    PanelService,
    RouteService,
    GradeService,
    HttpClient,
  ]
})
export class CaliberModule { }
