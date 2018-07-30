import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {CandidateService} from '../../../services/candidate/candidate.service';
import {CategoryService} from '../../../../../portals/Caliber/services/category/category.service';
import {ScreeningService} from '../../../services/screening/screening.service';
// import { Tag } from '../../entities/tag';
import {Category} from '../../../entities/Category';
import {ScheduleScreeningService} from '../../../services/schedule-screening/schedule-screening.service';
import {SkillTypesService} from '../../../services/skillTypes.service';

// import { SCHEDULEDSCREENINGS } from '../../mock-data/mock-scheduled-screening';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})

/*
  When the interview begins, candidate will give a short intro about themselves
  including a list of their technical skills (Java, SQL, HTML, etc).
  The screener will check the skills the candidate lists (required),
  flag any soft skill violations (optional) and give general
  feedback on the candidates introduction (optional).
*/
export class IntroductionComponent implements OnInit {

  constructor(
    //public tagService: TagService,
    private categoryService: CategoryService,
    private candidateService: CandidateService,
    private skillTypesService: SkillTypesService,
    private screeningService: ScreeningService,
    private scheduledscreeningService: ScheduleScreeningService ) { }


  public candidateName: string;
  public candidateTrack: Object;
  public currentScreeningId: Number;
  // public tagList: Tag[];
  public categoriesSelected: Category[];
  public allCategories: Category[];


  public comment: string;

  form = new FormGroup({
    comment: new FormControl('', [])
  });

  ngOnInit() {
    console.log("In the ngOnInit");
    // this.scheduledscreeningService.getScheduleScreenings().subscribe(scheduledScreenings =>{
    // scheduledScreenings.forEach(s => {
    //     console.log(scheduledScreenings);
    //     console.log("In the FOR");
    //     console.log(s.scheduledScreeningId.toString());
    //     console.log(localStorage.getItem('scheduledScreeningId'));
    //     if(s.scheduledScreeningId.toString() === localStorage.getItem('scheduledScreeningId'))
    //     {
    //       console.log("In the if");
    //       this.candidateName = s.candidate.name;
    //       // this.candidateTrack = s.skillTypeId;
    //       console.log(this.candidateName);
    //       this.screeningService.beginScreening(s, new Date(), 2, 51).subscribe(id =>{
    //         this.currentScreeningId = id;
    //       });
    //     }
    //   });
    // });
    this.candidateName = localStorage.getItem('candidateName');
    this.categoryService.fetchAll().subscribe(categories =>{
      this.allCategories = (<Category[]> categories);
      console.log(this.allCategories);
    });

    this.skillTypesService.getSkillTypeById(parseInt((localStorage.getItem('candidateTrack')), 10)).subscribe(skill =>{
      this.candidateTrack = skill.title;
    });
    this.categoriesSelected = [];

    //this.currentScreening = SCHEDULEDSCREENINGS[this.candidateService.getSelectedCandidate().candidateId - 1];
    //this.candidateName = this.candidateService.getSelectedCandidate().firstName + ' ' +
    //this.candidateService.getSelectedCandidate().lastName;
    //this.candidateTrack = this.candidateService.getSelectedCandidate().skillTypeName;
    //this.getTags();
  }

  // Get an array of all tags and assign it to tagList
  // getTags(): void {
  //   this.tagService.getAllTags().subscribe(
  //     allTags => {
  //       this.tagList = allTags;
  //     }
  //   );
  // }

  // When a tag is checked or unchecked on the Introduction view, update the list of checked tags.
  // Push checked tags to the tagListChecked array
  // Splice unchecked tags from the tagListChecked array
  updateCategoryList(selected: Category, checked: boolean) {

    if (checked) {
      this.categoriesSelected.push(selected);
    } else {
      const index = this.categoriesSelected.indexOf(selected);
      this.categoriesSelected.splice(index, 1);
    }
  }

  // Submit the comments on the Introduction view when the "Begin Questions" buton is clicked
  onSubmit() {
    // Send the comments to the appropriate service method saves them to the DB
    this.screeningService.submitIntroComment(this.comment);
    this.setCategories();

  }

  // Returns a boolean depending on whether a tag was checked.
  // Returns false if there are checked tags.
  categoryChosen(): boolean {
    return (this.categoriesSelected.length == 0);
  }

  setCategories()
  {
    return this.screeningService.setSelectedCategories(this.categoriesSelected);
  }

}
