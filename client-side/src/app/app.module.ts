import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { CaliberModule } from './Caliber/caliber.module';
import { Routes } from '@angular/router';
import { BamModule } from './Bam/bam.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavModule } from './nav/nav.module';
import { JanusComponent } from './janus/janus.component';
import { ChuckNorrisService } from './services/chuck-norris.service';


// loading routes from child modules this way will lazy load them
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: JanusComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'Caliber', loadChildren: './Caliber/caliber.module#CaliberModule'},
      {path: 'Bam', loadChildren: './Bam/bam.module#BamModule'},
      {path: '**', pathMatch: 'full', redirectTo: '/dashboard'}
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    NavModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    JanusComponent,
  ],
  providers: [
    ChuckNorrisService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
