import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CandidateService } from '../../services/candidate/candidate.service';
import { SkillTypeService } from '../../services/skillType/skill-type.service';
// import { TagService } from '../../../services/tag/tag.service';
import { CategoryService } from '../../../../../portals/Caliber/services/category/category.service';
import { ScreeningService } from '../../services/screening/screening.service';

import { SKILLTYPES } from '../../mock-data/mock-skillTypes';
// import { SCHEDULEDSCREENINGS } from '../../mock-data/mock-scheduled-screening';

// import { Tag } from '../../entities/tag';
import { SkillType } from '../../entities/skillType';
import { Category } from '../../../entities/Category';
import { map } from '../../../../../../../node_modules/rxjs/operators';
import { ScheduleScreeningService } from '../../services/schedule-screening/schedule-screening.service';
import { ScheduledScreening } from '../../entities/scheduleScreening';

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
    private skillTypeService: SkillTypeService,
    private screeningService: ScreeningService,
    private scheduleScreeningService: ScheduleScreeningService) { }


  public candidateName: string;
  public candidateTrack: string;
  public currentScreening: ScheduledScreening;
  // public tagList: Tag[];
  public categoriesSelected: Category[];
  public allCategories: Category[];
  

  public comment: string;

  form = new FormGroup({
    comment: new FormControl('', [])
  });

  ngOnInit() {
    //this.tagService.tagListChecked = [];
    this.categoryService.fetchAll().subscribe(categories =>{
      this.allCategories = (<Category[]> categories);
      console.log(this.allCategories);
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
  }

  // Returns a boolean depending on whether a tag was checked.
  // Returns false if there are checked tags.
  categoryChosen(): boolean {
    return (this.categoriesSelected.length == 0);
  }
}
