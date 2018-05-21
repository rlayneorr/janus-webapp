import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavModule } from './nav/nav.module';
import { JanusComponent } from './Janus/janus.component';
import { ChuckNorrisService } from './services/chuck-norris.service';

import { CaliberModule } from './portals/Caliber/caliber.module';
import { TraineeTechSkillsComponent } from './portals/Caliber/reports/trainee-tech-skills/trainee-tech-skills.component';
import { HttpClientModule } from '@angular/common/http';
import { RoleGuard } from './role-guard';
import { CookieService } from 'ngx-cookie-service';
import { HydraClientModule } from './gambit-client/gambit-client.module';
import { environment } from '../environments/environment';
import { HydraBatchUtilService } from './services/gambit-batch-util.service';

// Error Alert
import { ErrorAlertComponent } from './gambit-client/ui/error-alert/error-alert.component';
import { HydraInterceptor } from './gambit-client/interceptors/hydra.interceptor';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ToastrOptions } from './gambit-client/ui/error-alert/toastr-options';
import { LocationService } from './gambit-client/services/location/location.service';
import { GambitSkillService } from './gambit-client/services/skill/gambit-skill.service';
import { AuthenticationService } from './portals/Caliber/services/authentication.service';
import { RequestService } from './portals/Track-Force/services/request-service/request.service';
import { CurriculumService } from './portals/Track-Force/services/curriculum-service/curriculum.service';
import { InterviewService } from './portals/Track-Force/services/interview-service/interview-service';
import { MarketStatusService } from './portals/Track-Force/services/market-status/market-status.service';
import { PlacementService } from './portals/Track-Force/services/placement-service/placement.service';


// loading routes from child modules this way will lazy load them
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: JanusComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'Caliber', loadChildren: './portals/Caliber/caliber.module#CaliberModule' },
      { path: 'AssignForce', loadChildren: './portals/Assign-Force/assign-force.module#AssignForceModule' },
      { path: 'TrackForce', loadChildren: './portals/Track-Force/track-force.module#TrackForceModule' },
      { path: 'Bam', loadChildren: './portals/Bam/bam.module#BamModule' },
      { path: '**', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    NavModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ChartsModule,
    HttpClientModule,
    HydraClientModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    JanusComponent,
  ],
  providers: [
    ChuckNorrisService,
    RoleGuard,
    CookieService,
    HydraBatchUtilService,
    ErrorAlertComponent,
    LocationService,
    {provide: ToastOptions, useClass: ToastrOptions},
    AuthenticationService,
    RequestService,
    CurriculumService,
    InterviewService,
    MarketStatusService,
    PlacementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
