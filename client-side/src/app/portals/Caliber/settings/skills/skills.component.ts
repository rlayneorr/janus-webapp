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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Refactored Skills as Categories; Has View, Create, Edit, and Delete functionality -Tyerra Smith and Michael Brumley
  //these are going to be the 4 index parts
  div1;
  div2;
  div3;
  div4;
<<<<<<< HEAD
=======
>>>>>>> Refactored the Skill stuff to reflect the Category mock data on the JSON server. - Tyerra Smith and Michael Brumley
=======
>>>>>>> Refactored Skills as Categories; Has View, Create, Edit, and Delete functionality -Tyerra Smith and Michael Brumley


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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Refactored Skills as Categories; Has View, Create, Edit, and Delete functionality -Tyerra Smith and Michael Brumley
      this.numColumns = this.categories.length / 10 + 1; //this is the original
      //this.numColumns = Math.ceil(this.categories.length / 4);
      if (this.numColumns >= 4) {
        this.numColumns = 4;
<<<<<<< HEAD
=======
      //this.numColumns = this.categories.length / 8 + 1; this is the original
      this.numColumns = this.categories.length;
      if (this.numColumns > 3) {
        this.numColumns = 3;
>>>>>>> Refactored the Skill stuff to reflect the Category mock data on the JSON server. - Tyerra Smith and Michael Brumley
=======
>>>>>>> Refactored Skills as Categories; Has View, Create, Edit, and Delete functionality -Tyerra Smith and Michael Brumley
      }
      
      this.columns = Array.apply(null, { length: this.numColumns }).map(Number.call, Number);
      console.log(this.columns);
      console.log(this.numColumns);

      //this denotes the index for the for loop for the ngfor
      // this.div1= Math.ceil(this.categories.length/4);
      // this.div2= this.div1 + this.div1;
      // this.div3= this.div1 +this.div1 +this.div1;
      // this.div4= this.div1 +this.div1 +this.div1 +this.div1;

      //these are the logs to make sure im getting the right numbers when i making my divisions for my indexed for loops

      // console.log(this.div1);
      // console.log("1");
      // console.log(this.div2);
      // console.log("2");
      // console.log(this.div3);
      // console.log("3");
      // console.log(this.div4);
      // console.log("4");
     
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Refactored the Skill stuff to reflect the Category mock data on the JSON server. - Tyerra Smith and Michael Brumley
    console.log("We made it!");
    console.log(this.currentCategory);
    console.log(this.currentCategory.categoryId);
    this.categoryService.delete(this.currentCategory).subscribe();

<<<<<<< HEAD
<<<<<<< HEAD
    this.resetFormControl();

    this.ngOnInit();
=======
    this.skillService.delete(this.currentSkill);
=======
>>>>>>> Refactored the Skill stuff to reflect the Category mock data on the JSON server. - Tyerra Smith and Michael Brumley
    //This should work once implemented by the back-end -Tyerra Smith
    // may not need this statement without all of the inherited subjects
    this.resetFormControl();
>>>>>>> Added a deleteSkill method to enable deleting a category on the front-end.
=======
    this.resetFormControl();

    this.ngOnInit();
>>>>>>> Refactored Skills as Categories; Has View, Create, Edit, and Delete functionality -Tyerra Smith and Michael Brumley
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
    console.log("in nextColumn");
    console.log("Column : " + column);
    console.log("Index : " + index);
    console.log("Categories[" + index + "] --> " + this.categories[index].categoryId + " : " + this.categories[index].categoryName);

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
               console.log("False");
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
    // switch(index % 4)
    // {
    //   case 0: 
    //     column = 0;
    //   case 1:
    //     column = 1;
    //   case 2:
    //     column = 2;
    //   default:
    //     column = 3;
    // }
    // console.log(index % 4);
    // return true;
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
