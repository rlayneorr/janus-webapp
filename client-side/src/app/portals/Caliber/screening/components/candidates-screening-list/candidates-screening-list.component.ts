import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Pipes
import { SearchPipe } from '../../util/search.pipe';
import { DatePipe } from '@angular/common';

// Classes
import { Candidate } from '../../entities/Candidate';
import { ScheduledScreening } from '../../entities/scheduleScreening';

// Services
import { CandidateService } from '../../services/candidate/candidate.service';
import { ScreeningService } from '../../services/screening/screening.service';
import { ScheduleScreeningService } from '../../services/schedule-screening/schedule-screening.service';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service';
import { UrlService } from '../../../../../caliber-client/services/urls/url.service';

//import { CANDIDATES } from '../../../screening/mock-data/mock-candidates';
// import { SCHEDULEDSCREENINGS } from '../../../screening/mock-data/mock-scheduled-screening';

// Installed Modules
// npm install ngx-pagination --save
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { tick } from '../../../../../../../node_modules/@angular/core/testing';
import { SkillType } from '../../../entities/SkillType';

@Component({
  selector: 'app-candidates-screening-list',
  templateUrl: './candidates-screening-list.component.html',
  styleUrls: ['./candidates-screening-list.component.css'],
  providers:[DatePipe]
})

/*
   This is the landing / homepage for our functionality. There are many candidates that must be screened,
   and the screeners choose their candidates from a common pool.
   A screener will choose a candidate from the list, and a modal will appear with the options to
   begin the interview or return to the list. Candidate list is paginated, with 10 results per page.
*/
export class CandidatesScreeningListComponent implements OnInit {
  /* ###########################
        FIELDS
  ########################### */
  // array containing upcoming interviews
  scheduledScreenings: ScheduledScreening[];
  // when a screener (user) clicks on a screening,
  // save the candidate and scheduled screening
  // to their respective services.
  selectedCandidate: Candidate;
  selectedScheduledScreening: ScheduledScreening;
  // Flag for displaying the "Begin Interview" prompt
  showBeginScreeningPrompt = false;
  // random fields that are necessary for Jenkins to build.
  // Do not delete
  searchText; // text in search bar
  p; // current page
  allCandidates : Candidate[];
  formattedSchedule : string;
  skillType : SkillType;

  beginForm: FormGroup;
  /* ###########################
       CONSTRUCTOR and INIT
  ########################### */
  constructor(
    private httpClient: HttpClient,
    private candidateService: CandidateService,
    private screeningService: ScreeningService,
    private scheduleScreeningService: ScheduleScreeningService,
    private softSkillsViolationService: SoftSkillsViolationService,
    private questionScoreService: QuestionScoreService,
    private urlService: UrlService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private date: DatePipe
  ) {}

  ngOnInit() {
    // Need to unsubscribe from observables after use. However, some memory leaks are still occurring.
    // Quick fix is to check if the following services still have data in their arrays,
    // then refreshing the screen to flush out the data.
    if (
      this.softSkillsViolationService.softSkillViolations.length > 0 ||
      this.questionScoreService.questionScores.length > 0
    ) {
      window.location.reload(true);
    }

    // retrieve all scheduled interviews and populate the table of screenings.
    this.scheduleScreeningService.getScheduleScreenings().subscribe(data => {
      this.scheduledScreenings = data;
    });
    //this.allCandidates = CANDIDATES;
    console.log(this.scheduledScreenings);

  }

  /* ###########################
        FUNCTIONS
  ########################### */

  initFormControl() {
    let formattedSchedule = this.date.transform(this.selectedScheduledScreening.scheduledDate);
    this.beginForm = this.fb.group({
      'Name': [this.selectedScheduledScreening.candidate.name, Validators.required],
      //'Last Name': [this.selectedCandidate.lastName, Validators.required],
      'Date and Time': [formattedSchedule, Validators.required],
    });
  };

  //Get each Candidate's Track/SkillType -Tyerra Smith
  getSkillType(skillTypeId: number)
  {
    console.log(skillTypeId);
    this.httpClient.get<SkillType>(this.urlService.skillTypes.findById(skillTypeId)).subscribe(skill =>{
      this.skillType = skill;
    });
    console.log(this.skillType);
    // return this.skillType.title;
  }

  // Unhides the "Begin Interview" prompt
  toggleBeginScreeningPrompt() {
    if (this.showBeginScreeningPrompt) {
      return 'block';
    } else {
      return 'none';
    }
  }

  // clicking "Begin Interview" will save the candidate for later use
  confirmSelectedCandidate(): void {
    this.candidateService.setSelectedCandidate(this.selectedScheduledScreening.candidate);
    console.log(this.selectedCandidate);
    //this.selectedScheduledScreening = SCHEDULEDSCREENINGS[this.candidateService.getSelectedCandidate().candidateId - 1];
    console.log(this.selectedScheduledScreening);
    localStorage.setItem('scheduledScreeningId', this.selectedScheduledScreening.scheduledScreeningId.toString());
  }

  // clicking "Begin Interview" will create a new screening entry in the database
  beginScreening(): void {
    // create a new screening entry in the database by calling the screening service

      //this.selectedScheduledScreening = SCHEDULEDSCREENINGS[this.candidateService.getSelectedCandidate().candidateId - 1];
      this.screeningService.beginScreening(
        // must provide the current scheduled interview object
        this.selectedScheduledScreening,
        // create a new date which signifies the start of the interview
        new Date(),
        // This was not part of our iteration, but the "1" must be replaced
        // with the trainer's ID so that their is an association
        // between the interviewer and the person who screened them.
        this.selectedScheduledScreening.trainer,
        // provide the track of the selected candidate for later use.
        this.selectedScheduledScreening.skillTypeId
      )
      .subscribe(
        // take the data from the response from the database
        data => {
        // and save the screening ID as a cookie to localStorage.
        localStorage.setItem('candidateName', this.selectedScheduledScreening.candidate.name);
        localStorage.setItem('candidateTrack', this.selectedScheduledScreening.skillTypeId.toString());
        localStorage.setItem('screeningID', data.toString());
        console.log(localStorage.getItem('screeningID'));
      });
  }

  /**
   * Open the view modal
   * @param {any} content
   * @param {ScheduledScreening} index
   * @memberof CandidatesScreeningListComponent
   */
  openModal(content, index: ScheduledScreening) {
    this.selectedScheduledScreening = JSON.parse(JSON.stringify(index));
    this.selectedCandidate = JSON.parse(JSON.stringify(index.candidate));// essentially clone the object, there may be a better way
    this.formattedSchedule = this.date.transform(this.selectedScheduledScreening.scheduledDate, 'short');
    console.log(this.selectedCandidate);
    this.modalService.open(content);
    this.initFormControl();
  }
}
