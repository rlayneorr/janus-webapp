import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// services
import { environment } from '../../../../../environments/environment';

// entities
import { Category } from '../../entities/Category';
import { NgForm } from '@angular/forms/src/directives/ng_form';
// import { HydraSkill } from '../../../../hydra-client/entities/HydraSkill';
import { Skill } from '../../../../entities/Skill';
import { SkillService } from '../../services/skill.service';
// import { HydraSkillService } from '../../../../hydra-client/services/skill/hydra-skill.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  newSkill: Skill = {
    skillId: 0,
    skillName: '',
    isActive: true
  };

  addForm: FormGroup;

  categories: Category[];
  skills: Skill[];
  currentSkill: Skill;

  columns;
  numColumns: number;
  constructor(private modalService: NgbModal, private skillService: SkillService, private fb: FormBuilder) {
  }

  /**
   * Loads all Skills
   * @memberof CategoriesComponent
   */
  ngOnInit() {
    this.initFormControl();
    this.skillService.findAll().subscribe((resp) => {
      this.skills = resp;
      this.numColumns = this.skills.length / 8 + 1;
      if (this.numColumns > 3) {
        this.numColumns = 3;
      }
      this.columns = Array.apply(null, { length: this.numColumns }).map(Number.call, Number);
    });
  }

  resetFormControl() {
    this.addForm = this.fb.group({
      'name': ['', Validators.required]
    });
  }
  initFormControl() {
    this.addForm = this.fb.group({
      'name': [this.newSkill.skillName, Validators.required]
    });
  }

  /**
   * Adds a new Skill
   * @param {any} value
   * @memberof CategoriesComponent
   */
  addNewSkill(value) {
    this.newSkill.skillName = value.name;
    this.newSkill.isActive = true;
    this.skillService.create(this.newSkill).subscribe((succ) => {
      this.skills.push(succ);
    });
    // may not need this statement without all of the inherited subjects
    this.resetFormControl();
  }

  /**
   * Send call to update active status
   * @param {any} nameChange
   * @memberof CategoriesComponent
   */
  editCurrentSkill(nameChange) {
    this.skillService.update(this.currentSkill).subscribe((resp) => {
      this.skills.some( cat => {
        if (cat.skillId === resp.skillId) {
          cat = resp;
          return true;
        }
      });
    });

  }

  /**
   * Populates the Columns with Categories
   * @param {any} column
   * @param {any} index
   * @returns
   * @memberof CategoriesComponent
   */
  nextColumn(column, index) {
    switch (column) {
      case 0:
        if (index < this.skills.length / this.numColumns) {
          return true;
        }
        break;
      case 1:
        if (index > this.skills.length / this.numColumns) {
          // If the numbers of skills is 3 then this condition will activate
          if (this.numColumns === 3) {
            if (index < ((this.skills.length / this.numColumns) * 2)) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
        break;
      case 2:
        if (index > ((this.skills.length / this.numColumns) * 2)) {
          return true;
        } break;
      default:
        break;
    }
  }

  /**
   * Opens a Modal
   * @param {any} content
   * @memberof CategoriesComponent
   */
  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  /**
   * Open the edit modal
   * @param {any} content
   * @param {Skill} index
   * @memberof CategoriesComponent
   */
  editopen(content, index: Skill) {
    this.currentSkill = JSON.parse(JSON.stringify(index)); // essentially clone the object, there may be a better way
    this.modalService.open(content);
  }
}
// a comment
