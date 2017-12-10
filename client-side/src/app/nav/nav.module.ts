import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaliberNavComponent } from './caliber-nav/caliber-nav.component';
import { BamNavComponent } from './bam-nav/bam-nav.component';


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
    BamNavComponent
  ],
  providers: [],
  exports: [NavComponent]
})
export class NavModule { }
