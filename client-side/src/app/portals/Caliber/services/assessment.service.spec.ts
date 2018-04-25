// import { TestBed, inject } from '@angular/core/testing';
// import { HttpClientModule, HttpClient} from '@angular/common/http';
// import { AlertsService } from './alerts.service';
// import { AssessmentService } from './assessment.service';

// xdescribe('AssessmentService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientModule ],
//       providers: [
//         AssessmentService,
//         AlertsService,
//         HttpClient
//       ]
//     });
//   });

//   it('should be created', inject([AssessmentService], (service: AssessmentService) => {
//     expect(service).toBeTruthy();
//   }));
// });

// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AssessComponent } from './assess.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BatchService } from '../services/batch.service';
// import { AssessmentService } from '../services/assessment.service';
// import { GradeService } from '../services/grade.service';
// import { CategoryService } from '../services/category.service';
// import { NoteService } from '../services/note.service';
// import { FormBuilder, FormsModule } from '@angular/forms';
// import { DatePipe } from '@angular/common';
// import { CategorySkillPipe } from '../pipes/category-skill.pipe';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AlertsService } from '../services/alerts.service';
// import { Dependencies } from '../caliber.test.module';


// xdescribe('AssessComponent', () => {
//   let component: AssessComponent;

//   let fixture: ComponentFixture<AssessComponent>;
//   // let modalService: ComponentFixture<AssessComponent>;
//   // let batchService: ComponentFixture<AssessComponent>;
//   // let assessmentService: ComponentFixture<AssessComponent>;
//   // let gradeService: ComponentFixture<AssessComponent>;
//   // let categoryService: ComponentFixture<AssessComponent>;
//   // let noteService: ComponentFixture<AssessComponent>;
//   // let fb: ComponentFixture<AssessComponent>;
//   // let datePipe: ComponentFixture<AssessComponent>;
//   // let categorySkill: ComponentFixture<AssessComponent>;
//   // let alertsService: ComponentFixture<AssessComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule(Dependencies).compileComponents();
//   }), 1440000);

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AssessComponent);
//     component = fixture.componentInstance;
//     console.log(component);
//     // this.modalService = fixture.debugElement.injector.get(NgbModule.forRoot());
//     // this.assessmentService = fixture.debugElement.injector.get(AssessmentService);
//     // this.batchService = fixture.debugElement.injector.get(BatchService);
//     // this.gradeService = fixture.debugElement.injector.get(GradeService);
//     // this.categoryService = fixture.debugElement.injector.get(CategoryService);
//     // this.noteService = fixture.debugElement.injector.get(NoteService);
//     // this.categorySkill = fixture.debugElement.injector.get(CategorySkillPipe);
//     // this.alertsService = fixture.debugElement.injector.get(AlertsService);
//     // this.fb = fixture.debugElement.injector.get(FormBuilder);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { TestBed, async, inject } from '@angular/core/testing';
import { Response, ResponseOptions, XHRBackend} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AssessmentService } from '../services/assessment.service';
import { Assessment } from '../entities/Assessment';
import { AlertService } from '../../Bam/services/alert.service';
import { Batch } from '../entities/Batch';

describe('AssessmentService', () => {

    //declarations
    let a: Assessment;
    
    //configure the ngModule for each test
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AssessmentService,
                AlertService,
                {provide: XHRBackend, useClass: MockBackend},
            ]
        });

        a = new Assessment();
    });


    fit('should return an Observable<Assessment>',
        inject ([HttpTestingController, AssessmentService], (httpController : HttpTestingController, assessmentService: AssessmentService) => {
          let b = new Batch(); 
          b.batchId = 19;
          const mockAssessments =  [
                    {assessmentId: 10, title: 'title', batch: b, rawScore: 0, type: 'type', week: 3, category: null}
          ];

          assessmentService.fetchByBatchIdByWeek(18, 3).subscribe((assess => {
            let assessmentArr : Assessment[];
            assessmentArr = assess;
            expect(assessmentArr[0].assessmentId).toBe(10);
          }));

        }));
});
