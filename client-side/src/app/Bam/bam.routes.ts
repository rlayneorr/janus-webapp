import { Routes } from '@angular/router';
import { BamComponent } from './bam.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    component: BamComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/Bam/home'
      }
    ]
  }
];
