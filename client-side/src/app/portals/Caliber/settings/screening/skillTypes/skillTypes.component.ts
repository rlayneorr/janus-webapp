import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { Bucket } from '../entities/Bucket';
import { Category } from '../entities/Category';
import { CategoryWeight } from '../entities/Category-Weight';
import { SkillTypesService } from '../services/skillTypes.service';
import { BucketsService } from '../services/buckets.service';
import { CategoryWeightsService } from '../services/weight.service';
import { SettingsCategoriesService } from '../services/categories.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
    selector: 'app-skill-types',
    templateUrl: './skillTypes.component.html',
    styleUrls: ['./skillTypes.component.css'],
})

/**
 * This component should probably be rewitten because it is a mess right now
 *
 * You will need to see implementation in the skills service relating to the
 * skillType controler.
 * Whats working:
 * Creating a skill type and editing a skill
 *
 * Whats not working:
 * assigning buckets to skill types is not working.
 * adding weights needs to be added functionality does not exist
 */

/**
* Skill Type Component displays a template containing all the skill types from the database
* It also has access to modals that can create or edit a skill types
*
*
* @author chanconan
*/
export class SkillTypesComponent implements OnInit {

    public skillTypes: SkillType[] = [];
    public allSkillTypes: SkillType[] = [];
    public inactiveSkillTypes: SkillType[] = [];

    public allWeights: CategoryWeight[] = [];
    public currentWeights: CategoryWeight[] = [];
    public specificWeight: CategoryWeight;

    public allCategories: Category[] = [];
    public allBuckets: Bucket[] = [];
    public skillType: SkillType;
    public categoryBuckets: Bucket[];
    public error: boolean;
    public modalServiceRef;

    public category: Category;
    public total: number;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private skillTypeService: SkillTypesService,
        private bucketsService: BucketsService,
        private weightsService: CategoryWeightsService,
        private categoriesService: SettingsCategoriesService,
        private alertsService: AlertsService,
        private tab: NgbTabset,
    ) { }

    ngOnInit() {
        this.grabAllSkillTypes();
        this.grabAllCategories();
        if (this.categoriesService.routingToAllCategories === true) {
            this.categoriesService.routingToAllCategories = false;
            this.tab.activeId = 'tab-2';
        }
    
        this.grabAllBuckets();
        if (this.bucketsService.routingToAllBuckets === true) {
            this.bucketsService.routingToAllBuckets = false;
            this.tab.activeId = 'tab-3';
        }
    }
    
    /**
    * Grabs all skill types and stores the information into a variable
    */
   grabAllSkillTypes() {
    this.skillTypeService.getSkillTypes().subscribe((results) => {
        this.allSkillTypes = results;
        // this.setSkillTypes();
        // this.allSkillTypes.sort(this.compare);
        });
    }

    /**
    * Grabs all categories and stores the information into a variable
    */
   grabAllCategories() {
    this.categoriesService.getCategories().subscribe(results => {
        this.allCategories = results;
        });
    }

    /**
    * Grabs all buckets and stores the information into a variable
    */
   grabAllBuckets() {
    this.bucketsService.getAllBuckets().subscribe(results => {
        this.allBuckets = results;
        });
    }

    /**
    * Stores information about the skill type that was selected
    * If there are any buckets associated to the skill type,
    * set the array to the selected buckets to the array
    * @param skillType: selected skill type
    */
   editSkillType(skillType) {
        this.skillType = {
            skillTypeName: skillType.skillTypeName,
            skillTypeId: skillType.skillTypeId,
            categories: skillType.categories
        };

        this.resetCategories(skillType, null);
        this.equalsMax(skillType);
    }

    resetCategories(skillType: SkillType, category: Category){
        if(category){
            if(!this.allCategories.includes(category)){
                this.allCategories.push(category);
            }
        }
        
        this.skillType.categories.forEach(hasCat => {
            this.allCategories.forEach(same => {
                if(same.categoryName === hasCat.categoryName){
                    this.allCategories.splice(this.allCategories.indexOf(same), 1);
                }
            });
        });
    }

    /**
    * Opens the modal for creating and editing skill SkillType
    * Resets fields clears the data within set fields
    * Creates a variable to reference the open modal service
    */
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.resetFields();
        }, (reason) => {
            this.resetFields();
        });
        event.stopPropagation();
    }

    confirmDelete(skillType: SkillType){
        this.skillType = skillType;
      }

    deleteSkillType(){
        if (this.skillType) { 
          this.skillTypeService.deleteSkillType(this.skillType.skillTypeId).subscribe(result => {
            this.grabAllSkillTypes();
          });
          this.savedSuccessfully();
        }
      }

    /**
    * Checks which buckets are currently associated with the selected skill Type
    * If a bucket from all buckets already belong to the selected skill type, hide the bucket
    * Includes with objects giving wrong results, so used an
    * array of bucket ids to utilize the includes method.
    * @param bucketId: Id of single bucket
    */
    checkContains(category) {
        if (this.skillType) {
            return this.skillType.categories.includes(category);
        }
        return false;
    }

    /**
    * Adds a new bucket object to the selected skill type.
    * Set weight of new bucket to be 0
    * Add the bucketId to the array of Ids of selected skill type
    * @param bucket: bucket object needed to be added to skill types.
    */
    addToCategories(category: Category) {
        if(!this.skillType){
            this.skillType = {
                skillTypeName: null,
                skillTypeId: null,
                categories: []
            };
        }
        
        if (this.skillType) {            
            this.skillType.categories.push(category);
            this.skillType.categories[this.skillType.categories.indexOf(category)].categoryWeight = {
                weightId: 0,
                skillTypeId: this.skillType.skillTypeId,
                categoryId: category.categoryId,
                weight: 0
            };
        }
        console.log(this.skillType.categories)
    }

    /**
    * Removes all references to the bucket that is associated to the skill type
    * @param bucket: bucket object to be removed from all associates to the skill type
    */
    removeCategories(category: Category) {
        for (const singleBucketIndex in this.skillType.categories) {
            if (this.skillType.categories[singleBucketIndex] === category) {
                this.skillType.categories.splice(Number(singleBucketIndex), 1);
            }
        }
        this.resetCategories(this.skillType, category);
        this.equalsMax(this.skillType);
    }

    skillTypeUpdate(skillType: SkillType) {
        this.skillTypeService.updateSkillType(skillType).subscribe(results => {
            this.grabAllSkillTypes();
        });
    }

    weightChange(skillType: SkillType, category: Category, weight: number){
        skillType.categories[skillType.categories.indexOf(category)].categoryWeight.weight = weight;
        console.log(skillType.categories);
        this.equalsMax(skillType);
    }

    equalsMax(skillType: SkillType){
        this.total = 0;
        skillType.categories.forEach(category => {
            this.total = this.total + category.categoryWeight.weight;
        });
        if(this.total == 100){
            this.error = false;
        }
        else{
            this.error = true;
        }
    }

    /**
    * Creates a new skill type to be created
    * Grabs all the skill types after the information has been submitted
    * @param modal: Form information from the modal, with parameters matching the SkillType entity
    */

    createNewSkillType(modal: SkillType, categories: Category[]) {
        this.skillType = modal;
        this.skillType.categories = categories;
        this.skillTypeService.createSkillType(this.skillType).subscribe(results => {
            this.grabAllSkillTypes();
        });
        this.savedSuccessfully();
    }

    setNewSkillType(){
        this.skillType = {
            skillTypeId: 0,
            skillTypeName: '',
            categories: []
        }
        this.total = 0;
        this.equalsMax(this.skillType);
    }

    /**
    * Resets all fields that were used for the modal
    */
    resetFields() {
        this.skillType = null;
        this.error = false;
        this.grabAllCategories();
        this.grabAllSkillTypes();
    }

    savedSuccessfully() {
        this.alertsService.success('Saved successfully');
    }
}
