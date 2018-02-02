import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AssignForceComponent } from './assign-force.component';

export const routes: Routes = [
  {
    path: '',
    component: AssignForceComponent,
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
