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
  //these are going to be the 4 index parts
  div1;
  div2;
  div3;
  div4;
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
      this.columns = Array.apply(null, { length: this.numColumns }).map(Number.call, Number);

      console.log("current categories", this.categories);

      //this denotes the index for the loop for the ngfor to map the categories into 4 tables
      // this.div1= Math.ceil(this.categories.length/4);
      // this.div2= this.div1 + this.div1;
      // this.div3= this.div1 +this.div1 +this.div1;
      // this.div4= this.div1 +this.div1 +this.div1 +this.div1;

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
      //this reloads the page. Placeholder.
      this.ngOnInit();
    });
    // may not need this statement without all of the inherited subjects
    this.resetFormControl();
  }
  deleteSkill() {
    console.log("We made it!");
    console.log(this.currentCategory);
    console.log(this.currentCategory.categoryId);
    this.categoryService.delete(this.currentCategory).subscribe();
    this.resetFormControl();
    this.ngOnInit();
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
  editopen(content, index: Category) {
    this.currentCategory = JSON.parse(JSON.stringify(index)); // essentially clone the object, there may be a better way
    this.modalService.open(content);
  }
}
