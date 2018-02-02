import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaliberNavComponent } from './caliber-nav/caliber-nav.component';
import { AssignForceComponent } from '../portals/Assign-Force/assign-force.component';
import { AssignForceNavComponent } from './assign-force-nav/assign-force-nav.component';
import { TracknForceNavComponent } from './track-force-nav/track-force-nav.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
  ],
  declarations: [
    NavComponent,
    CaliberNavComponent,
    AssignForceNavComponent,
    TracknForceNavComponent
  ],
  providers: [],
  exports: [NavComponent]
})
export class NavModule { }
