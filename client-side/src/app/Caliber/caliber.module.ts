import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './caliber.routes';
import { CaliberComponent } from './caliber.component';
import { HomeComponent } from './home/home.component';
import { AssessComponent } from './assess/assess.component';
import { NavComponent } from '../nav/nav.component';
import { NavModule } from '../nav/nav.module';
import { ManageComponent } from './manage/manage.component';
import { ReportsComponent } from './reports/reports.component';
import { CommonModule } from '@angular/common';
import { WeeklyLineChartComponent } from './weekly-line-chart/weekly-line-chart.component';

import { VpBarGraphComponent } from './home/vp-bar-graph/vp-bar-graph.component';
import { VpLineGraphComponent } from './home/vp-line-graph/vp-line-graph.component';
import { VpPanelGraphComponent } from './home/vp-panel-graph/vp-panel-graph.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { VpHomeLineGraphService } from './services/graph/vp-home-line-graph.service';
import { VpHomeSelectorService } from './services/selector/vp-home-selector.service';
import { ColorService } from './services/colors/color.service';
import { TrainerService } from './services/trainer.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CategoriesService } from './services/categories.service';
import { SettingsComponent } from './settings/settings.component';
import { CategoriesComponent } from './settings/categories/categories.component';
import { TrainersComponent } from './settings/trainers/trainers.component';
import { LocationsComponent } from './settings/locations/locations.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    ChartsModule,
    AngularFontAwesomeModule

  ],
  declarations: [
    CaliberComponent,
    HomeComponent,
    AssessComponent,
    ManageComponent,
    ReportsComponent,
    WeeklyLineChartComponent,
    VpBarGraphComponent,
    VpLineGraphComponent,
    VpPanelGraphComponent,
    SettingsComponent,
    CategoriesComponent,
    TrainersComponent,
    LocationsComponent
  ],
  providers: [
    VpHomeLineGraphService,
    VpHomeSelectorService,
    ColorService,
    TrainerService,
    CategoriesService,
  ]
})
export class CaliberModule { }
