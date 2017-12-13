import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TrackForceComponent } from './track-force.component';

export const routes: Routes = [
  {
    path: '',
    component: TrackForceComponent,
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
        redirectTo: '/TrackForce/home'
      }
    ]
  }
];
