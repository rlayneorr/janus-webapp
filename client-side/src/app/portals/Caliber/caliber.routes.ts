import {Routes} from '@angular/router';
// components
import {CaliberComponent} from './caliber.component';
import {HomeComponent} from './home/home.component';
import {AssessComponent} from './assess/assess.component';
import {ManageComponent} from './manage/manage.component';
import {ReportsComponent} from './reports/reports.component';
import {SettingsComponent} from './settings/settings.component';
import {SkillsComponent} from './settings/skills/skills.component';
import {LocationsComponent} from './settings/locations/locations.component';
import {TrainersComponent} from './settings/trainers/trainers.component';
import {QualityComponent} from './quality/quality.component';
import {PanelComponent} from './panel/panel/panel.component';
import {TrainerProfilesComponent} from './settings/trainer-profile/trainer-profile.component';
import {RoleGuard, roles} from '../../role-guard';
import {ScreeningComponent} from './screening/components/screening/screening.component';
import {CandidatesScreeningListComponent} from './screening/components/candidates-screening-list/candidates-screening-list.component';
import {QuestionsTableComponent} from './screening/components/questions-table/questions-table.component';
import {FinalReportComponent} from './screening/components/final-report/final-report.component';
import {IntroductionComponent} from './screening/components/introduction/introduction.component';
import {PassFailComponent} from './screening/components/pass-fail/pass-fail.component';
import {ScreeningConfigComponent} from './settings/screening/screening.component';
import {BucketComponent} from './settings/screening/bucket/bucket.component';
import {CategoriesComponent} from './settings/screening/categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: CaliberComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole] }
      },
      {
        path: 'manage',
        component: ManageComponent,
        canActivate: [RoleGuard],
        data: { roles: [roles.panelRole, roles.qcRole, roles.trainerRole, roles.vpRole] }
      },
      {
        path: 'assess',
        component: AssessComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [
            roles.vpRole,
            roles.trainerRole
          ]
        }
      },
      {
        path: 'quality',
        component: QualityComponent,
        canActivate: [RoleGuard],
        data: { roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole] }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [RoleGuard],
        data: { roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole] }
      },
      {
        path: 'panel',
        component: PanelComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [
            roles.vpRole,
            roles.panelRole
          ]
        }
      },
      {
        path: 'screening',
        component: ScreeningComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [
            roles.screenerRole, roles.vpRole
          ]
        },
        children: [
          {
            path: 'pendingScreeningsList',
            component: CandidatesScreeningListComponent,
          },
          {
            path: 'questions',
            component: QuestionsTableComponent,
          },
          {
            path: 'finalReport',
            component: FinalReportComponent,
          },
          {
            path: 'introduction',
            component: IntroductionComponent,
          },
          {
            path: 'passFail',
            component: PassFailComponent
          }
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole]
        },
        children: [
          {
            path: 'skills',
            component: SkillsComponent
          },
          {
            path: 'locations',
            component: LocationsComponent
          },
          {
            path: 'trainers',
            component: TrainersComponent
          },
          {
            path: 'trainer-profile',
            component: TrainerProfilesComponent,
          },
          {
            path: 'screening',
            component: ScreeningConfigComponent,
            children: [

            ]
          },
          {
           path: 'screening/bucket',
            component: BucketComponent
          },
          {
            path: 'screening/categories',
            component: CategoriesComponent,
          }
        ]
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/Caliber/home'
      }
    ]
  }
];
