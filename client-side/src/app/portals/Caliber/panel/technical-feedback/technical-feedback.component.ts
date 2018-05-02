import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
// entities
import { PanelFeedback } from '../../entities/PanelFeedback';
import { GambitSkill } from '../../../../hydra-client/entities/GambitSkill';

// services
import { GambitSkillService } from '../../../../hydra-client/services/skill/gambit-skill.service';

import { CreatePanelComponent } from '../create-panel/create-panel.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-technical-feedback',
  templateUrl: './technical-feedback.component.html',
  styleUrls: ['./technical-feedback.component.css']
})
export class TechnicalFeedbackComponent implements OnInit {
  techList: GambitSkill[];
  filteredTechList: GambitSkill[] = [];

  @Input() skillForm: FormGroup;

  /**
<<<<<<< HEAD
   * @param categoryService
   */
  constructor(private categoryService: CategoriesService) {
    this.technologyForm = new FormGroup({
      technology: new FormControl(),
      result: new FormControl(),
      status: new FormControl(),
      comment: new FormControl()
    });
=======
   *
   * @param skillService
   */
  constructor(private skillService: GambitSkillService) {
    this.skillForm = new FormGroup({
       skill: new FormControl(),
       result: new FormControl(),
       status: new FormControl(),
       comment: new FormControl()
      });
>>>>>>> a75eb6877589cf2ca0720eac1609d1725b5c3d02
  }

  /**
   * gets skill list and filters out duplicates
   */
  ngOnInit() {
    this.skillService.findAllActive().subscribe(skills => {
      this.techList = skills;
    });
  }
}
