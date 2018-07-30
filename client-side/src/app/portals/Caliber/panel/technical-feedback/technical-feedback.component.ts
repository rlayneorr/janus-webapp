import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
// entities
import {GambitSkill} from '../../../../caliber-client/entities/GambitSkill';
// services
import {GambitSkillService} from '../../../../caliber-client/services/skill/gambit-skill.service';

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
