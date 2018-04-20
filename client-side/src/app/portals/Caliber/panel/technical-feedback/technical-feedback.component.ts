import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
// entities
import { PanelFeedback } from '../../entities/PanelFeedback';

// services
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../entities/Skill';
import { CreatePanelComponent } from '../create-panel/create-panel.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-technical-feedback',
  templateUrl: './technical-feedback.component.html',
  styleUrls: ['./technical-feedback.component.css']
})
export class TechnicalFeedbackComponent implements OnInit {
  techList: Skill[];
  filteredTechList: Skill[] = [];

  @Input() technologyForm: FormGroup;

  /**
   *
   * @param skillService
   */
  constructor(private skillService: SkillService) {
    this.technologyForm = new FormGroup({
       technology: new FormControl(),
       result: new FormControl(),
       status: new FormControl(),
       comment: new FormControl()
      });
  }

  /**
   * gets technology list and filters out duplicates
   */
  ngOnInit() {
    this.skillService.listSubject.asObservable().subscribe(skills => {
      this.techList = skills;
    });
  }
}
