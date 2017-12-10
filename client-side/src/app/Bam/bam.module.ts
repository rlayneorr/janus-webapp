import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './bam.routes';
import { BamComponent } from './bam.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from '../nav/nav.component';
import { NavModule } from '../nav/nav.module';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    BamComponent,
    HomeComponent,
    CalendarComponent,
  ],
  providers: []
})
export class BamModule { }
