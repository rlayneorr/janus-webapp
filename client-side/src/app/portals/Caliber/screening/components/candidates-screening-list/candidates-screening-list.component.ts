import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
import { UrlService } from '../../../../../../app/gambit-client/services/urls/url.service';
import { SkillType } from '../../../entities/SkillType';

@Component({
  selector: 'app-candidates-screening-list',
  templateUrl: './candidates-screening-list.component.html',
  styleUrls: ['./candidates-screening-list.component.css'],
  providers:[DatePipe, SearchPipe]
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
  allScheduledScreenings: ScheduledScreening[];
  /* when a screener (user) clicks on a screening,
  // save the candidate and scheduled screening
   to their respective services. */
  selectedCandidate: Candidate;
  selectedScheduledScreening: ScheduledScreening;

  // Flag for displaying the "Begin Interview" prompt
  showBeginScreeningPrompt = false;
  
  // text in search bar
  searchText = ''; 

  // current page
  p; 

  //A variable to hold the date and time of the screening in a more readable format
  formattedSchedule : string;

  //Variable to hold the skill type that corresponds to te=he skillTypeId of each scheduled screening
  skillType : SkillType;

  //Begin the form
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
    private date: DatePipe,
    private search: SearchPipe
  ) {}

  ngOnInit() {
    //Flush the cache/saved data
    if (
      this.softSkillsViolationService.softSkillViolations.length > 0 ||
      this.questionScoreService.questionScores.length > 0
    ) {
      window.location.reload(true);
    }
    //Always clear the local storage upon loading
    localStorage.clear();

    // retrieve all scheduled interviews and populate the table of screenings.
    this.scheduleScreeningService.getScheduleScreenings().subscribe(data => {
      this.allScheduledScreenings = data;
      this.scheduledScreenings = data;
    });

    console.log(this.scheduledScreenings);
    
  }

  /* ###########################
        FUNCTIONS
  ########################### */

  //Initializes the form control
  initFormControl() {
    let formattedSchedule = this.date.transform(this.selectedScheduledScreening.scheduledDate);
    this.beginForm = this.fb.group({
      'Name': [this.selectedScheduledScreening.candidate.name, Validators.required],
      'Date and Time': [formattedSchedule, Validators.required],
    });
  };

  //Function called whenever there is something entered into the searchbar; Uses SearchPipe
  searchCandidates(){
    if (this.searchText != ''){
      this.scheduledScreenings = this.search.transform(this.allScheduledScreenings, this.searchText);
    }
    else
    {
      this.scheduledScreenings = this.allScheduledScreenings;
    }
  }

  //Get each Candidate's Track/SkillType 
  getSkillType(skillTypeId: number)
  {
    this.httpClient.get<SkillType>(this.urlService.skillTypes.findById(skillTypeId)).subscribe(skill =>{
      this.skillType = skill;
    });
    console.log(this.skillType);
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
    console.log(this.selectedScheduledScreening);

    //Storing data for later use
    localStorage.setItem('scheduledScreeningId', this.selectedScheduledScreening.scheduledScreeningId.toString());
    localStorage.setItem('candidateName', this.selectedScheduledScreening.candidate.name);
    localStorage.setItem('candidateTrack', this.selectedScheduledScreening.skillTypeId.toString());
  }

  // clicking "Begin Interview" will create a new screening entry in the database
  beginScreening(): void {
    // create a new screening entry in the database by calling the screening service
    this.screeningService.beginScreening(
      // must provide the current scheduled interview object
      this.selectedScheduledScreening,
      // create a new date which signifies the start of the interview
      new Date(),
      // must provide the trainer's id (the id of the screener)
      this.selectedScheduledScreening.trainer,
      // provide the track/skillType of the selected candidate screening for later use.
      this.selectedScheduledScreening.skillTypeId
    )
    .subscribe(
      // take the data from the response
      data => {
      // and save the screening ID as a cookie to localStorage.
      localStorage.setItem('screeningID', data.toString());
    });
  }

  /**
   * Open the view modal
   * @param {any} content
   * @param {ScheduledScreening} index
   * @memberof CandidatesScreeningListComponent
   */
  openModal(content, index: ScheduledScreening) {
    //update variables to reflect the screening selected
    this.selectedScheduledScreening = JSON.parse(JSON.stringify(index));
    this.selectedCandidate = JSON.parse(JSON.stringify(index.candidate));
    
    //Format the date
    this.formattedSchedule = this.date.transform(this.selectedScheduledScreening.scheduledDate, 'short');
    console.log(this.selectedCandidate);
    this.modalService.open(content);
    this.initFormControl();
  }
}