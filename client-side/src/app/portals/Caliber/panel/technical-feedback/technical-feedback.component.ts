import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
// entities
import { PanelFeedback } from '../../entities/PanelFeedback';
import { GambitSkill } from '../../../../gambit-client/entities/GambitSkill';

// services
import { GambitSkillService } from '../../../../gambit-client/services/skill/gambit-skill.service';

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
