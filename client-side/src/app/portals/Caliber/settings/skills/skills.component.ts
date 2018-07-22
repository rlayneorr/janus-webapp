import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { NgForm } from '@angular/forms/src/directives/ng_form';
import { GambitSkill } from '../../../../gambit-client/entities/GambitSkill';
import { GambitSkillService } from '../../../../gambit-client/services/skill/gambit-skill.service';
import { Category } from '../../entities/Category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  newCategory: Category = {
    categoryId: 0,
    categoryName: ''
  };

  addForm: FormGroup;

  // skills: GambitSkill[];
  // currentSkill: GambitSkill;

  categories: Category[];
  currentCategory: Category;


  columns;
  numColumns: number;
  // private skillService: GambitSkillService
  constructor(private modalService: NgbModal, private categoryService : CategoryService , private fb: FormBuilder) {
  }

  /**
   * Loads all Skills
   * @memberof SkillsComponent
   */
  ngOnInit() {
    this.initFormControl();
    this.categoryService.fetchAll().subscribe((resp) => {
      this.categories = resp;
      console.log(this.categories);
      //If all categories are not shown, edit the divisor
      //this.numColumns = this.categories.length / 8 + 1; this is the original
      this.numColumns = this.categories.length;
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
      'name': [this.newCategory.categoryName, Validators.required]
    });
  }

  /**
   * Adds a new Skill
   * @param {any} value
   * @memberof SkillsComponent
   */
  addNewSkill(value) {
    this.newCategory.categoryName = value.name;
    this.categoryService.create(this.newCategory).subscribe((succ) => {
      this.categories.push(succ);
      console.log(this.newCategory);
    });
    // may not need this statement without all of the inherited subjects
    this.resetFormControl();
  }

  deleteSkill() {
    console.log("We made it!");
    console.log(this.currentCategory);
    console.log(this.currentCategory.categoryId);
    this.categoryService.delete(this.currentCategory).subscribe();

    //This should work once implemented by the back-end -Tyerra Smith
    // may not need this statement without all of the inherited subjects
    this.resetFormControl();
  }


  /**
   * Rewrote to actual work and send correct information.
   * Responsible for updating a skill on name change or active change
   *
   * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
   */
  editCurrentSkill() {
    this.categoryService.update(this.currentCategory).subscribe((resp) => {
      const idx = this.categories.findIndex(category => category.categoryId === resp.categoryId);
      this.categories[idx] = resp;
    });
  }

  /**
   * Populates the Columns with Skills
   * @param {any} column
   * @param {any} index
   * @returns
   * @memberof SkillsComponent
   */
  nextColumn(column, index) {
    switch (column) {
      case 0:
        if (index < this.categories.length / this.numColumns) {
          return true;
        }
        break;
      case 1:
        if (index > this.categories.length / this.numColumns) {
          // If the numbers of skills is 3 then this condition will activate
          if (this.numColumns === 3) {
            if (index < ((this.categories.length / this.numColumns) * 2)) {
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
        if (index > ((this.categories.length / this.numColumns) * 2)) {
          return true;
        } break;
      default:
        break;
    }
  }

  /**
   * Opens a Modal
   * @param {any} content
   * @memberof SkillsComponent
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
   * @memberof SkillsComponent
   */
  editopen(content, index: GambitSkill) {
    this.currentCategory = JSON.parse(JSON.stringify(index)); // essentially clone the object, there may be a better way
    this.modalService.open(content);
  }
 }
