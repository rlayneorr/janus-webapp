import { Routes } from '@angular/router';
import { AssignForceComponent } from './assign-force.component';
import { OverviewComponent } from './components/overview/overview.component';

export const routes: Routes = [
  {
    path: '',
    component: AssignForceComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/AssignForce/overview'
      }
    ]
  }
];
