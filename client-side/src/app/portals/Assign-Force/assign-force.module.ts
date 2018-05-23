import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './assign-force.routes';
import { AssignForceComponent } from './assign-force.component';
import { NavComponent } from '../../nav/nav.component';
import { NavModule } from '../../nav/nav.module';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../hydra-client/services/location/location.service';
import { OverviewComponent } from './components/overview/overview.component';

// primeng
import { PanelModule, GrowlModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { SplitButtonModule, ButtonModule } from 'primeng/primeng';

import { Ng2CsvModule } from 'ng2csv';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes),
    PanelModule,
    DataTableModule,
    ProgressBarModule,
    SplitButtonModule,
    ButtonModule,
    GrowlModule,
    Ng2CsvModule
  ],
  declarations: [
    AssignForceComponent,
    OverviewComponent,
  ],
  providers: [
    LocationService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AssignForceModule { }
