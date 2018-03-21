// Modules
import { CalendarModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule, Ng2OrderPipe } from 'ng2-order-pipe';
import { OverlayPanelModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';

// Bam essential
import { AlertsComponent } from './components/alerts/alerts.component';
import { BamComponent } from './bam.component';
import { BamRoutingModule } from './bam-routing.module';
import { HomeComponent } from './components/home/home.component';

// Services
import { AddSubtopicService } from './services/add-subtopic.service';
import { AlertService } from './services/alert.service';
import { BatchService } from './services/batch.service';
import { CalendarService } from './services/calendar.service';
import { CalendarStatusService } from './services/calendar-status.service';
import { CurriculumService } from './services/curriculum.service';
import { DragndropService } from './services/dragndrop.service';
import { SearchTextService } from './services/search-text.service';
import { SessionService } from './services/session.service';
import { SubtopicService } from './services/subtopic.service';
import { TopicService } from './services/topic.service';
import { UsersService } from './services/users.service';

// Calendar
import { AddAssociateToBatchComponent } from './components/calendar/add-associate-to-batch/add-associate-to-batch.component';
import { AddSubtopicComponent } from './components/calendar/add-subtopic/add-subtopic.component';
import { CalendarComponent } from './components/calendar/calendar-view/calendar.component';
import { EditBatchComponent } from './components/calendar/edit-batch/edit-batch.component';
import { ExistingSubtopicModalComponent } from './components/calendar/existing-subtopic-modal/existing-subtopic-modal.component';
import { RemoveAssociateFromBatchComponent } from './components/calendar/remove-associate-from-batch/remove-associate-from-batch.component';
import { ViewAssociatesComponent } from './components/calendar/view-associates/view-associates.component';

// Curriculum
import { CourseStructureComponent } from './components/curriculum-editor/course-structure/course-structure.component';
import { CurriculumWeekComponent } from './components/curriculum-editor/curriculum-week/curriculum-week.component';
import { MainCurriculumViewComponent } from './components/curriculum-editor/main-curriculum-view/main-curriculum-view.component';
import { SubtopicSearchComponent } from './components/curriculum-editor/subtopic-search/subtopic-search.component';
import { TopicPoolComponent } from './components/curriculum-editor/topic-pool/topic-pool.component';
import { TopicSearchComponent } from './components/curriculum-editor/topic-search/topic-search.component';

// Dahsboard
import { AllBatchesComponent } from './components/batches/all-batches/all-batches.component';
import { BatchProgressBarComponent } from './components/dashboard/batch-progress-bar/batch-progress-bar.component';
import { BatchesSearchComponent } from './components/batches/batches-search/batches-search.component';
import { BatchesTableComponent } from './components/batches/batches-table/batches-table.component';
import { DashboardInfoComponent } from './components/dashboard/dashboardinfo/dashboardinfo.component';
import { LoadingSpinnerComponent } from './components/dashboard/ui/loading-spinner/loading-spinner.component';
import { MyBatchesComponent } from './components/batches/my-batches/my-batches.component';
import { WelcomeComponent } from './components/dashboard/welcome/welcome.component';

// Boom
import { BoomComponent } from './components/boom/boom.component';

// Pipes
import { FilterBatchPipe } from './Pipes/filter-batch.pipe';
import { OrderPipe } from './pipes/order.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    BamRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    ScheduleModule,
    DragDropModule,
    CalendarModule,
    OverlayPanelModule,
    ChartsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    BamComponent,
    HomeComponent,
    CurriculumWeekComponent,
    MainCurriculumViewComponent,
    TopicPoolComponent,
    CourseStructureComponent,
    MyBatchesComponent,
    AllBatchesComponent,
    BatchesTableComponent,
    BatchesSearchComponent,
    EditBatchComponent,
    WelcomeComponent,
    DashboardInfoComponent,
    BatchProgressBarComponent,
    LoadingSpinnerComponent,
    AddAssociateToBatchComponent,
    EditBatchComponent,
    RemoveAssociateFromBatchComponent,
    BatchProgressBarComponent,
    AddSubtopicComponent,
    LoadingSpinnerComponent,
    DashboardInfoComponent,
    ViewAssociatesComponent,
    CalendarComponent,
    ViewAssociatesComponent,
    CalendarComponent,
    AddSubtopicComponent,
    TopicSearchComponent,
    SubtopicSearchComponent,
    OrderPipe,
    SearchPipe,
    FilterBatchPipe,
    AlertsComponent,
    BoomComponent,
    ExistingSubtopicModalComponent
  ],
  providers: [
    CurriculumWeekComponent,
    DragndropService,
    CourseStructureComponent,
    SessionService,
    UsersService,
    EditBatchComponent,
    AddAssociateToBatchComponent,
    RemoveAssociateFromBatchComponent,
    MainCurriculumViewComponent,
    TopicPoolComponent,
    SearchPipe,
    ViewAssociatesComponent,
    BatchService,
    CurriculumService,
    CalendarService,
    AddSubtopicService,
    CalendarStatusService,
    SearchTextService,
    TopicService,
    SubtopicService,
    AlertService,
    Ng2OrderPipe
  ],
  exports: [
    SearchPipe,
    OrderPipe
  ]
})
export class BamModule { }
