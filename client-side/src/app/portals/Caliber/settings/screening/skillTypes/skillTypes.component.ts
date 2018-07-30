import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { SkillType } from '../entities/SkillType';
import { Bucket } from '../entities/Bucket';
import { Category } from '../entities/Category';
import { CategoryWeight } from '../entities/Category-Weight';
import { SkillTypesService } from '../services/skillTypes.service';
import { BucketsService } from '../services/buckets.service';
import { SettingsCategoriesService } from '../services/categories.service';
import { CategoryWeightsService } from '../services/weight.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
    selector: 'app-skill-types',
    templateUrl: './skillTypes.component.html',
    styleUrls: ['./skillTypes.component.css'],
})

/**
* Skill Type Component displays a template containing all the skill types from the database
* It also has access to modals that can create or edit a skill types
*
* @author chanconan
*/

/**
 * SkillType Component modals are able to attach and detach categories to said skill types.
 * Categories will be provided a weight when they are attached and each skill type must have a max weight of 100.
 *
 * @author John Lacap | 1805May-29-Java | WVU | Richard Orr
 */
export class SkillTypesComponent implements OnInit {

    public skillTypes: SkillType[] = [];
    public allSkillTypes: SkillType[] = [];
    public inactiveSkillTypes: SkillType[] = [];
    public allCategories: Category[] = [];
    public allWeights: CategoryWeight[] = [];
    public allBuckets: Bucket[] = [];

    public skillType: SkillType;
    public categoryBuckets: Bucket[];
    public error: boolean;

    public category: Category;
    public weight: CategoryWeight;
    public total: number;
    public errorMessage: string = '';

    constructor(
        private modalService: NgbModal,
        private skillTypeService: SkillTypesService,
        private bucketsService: BucketsService,
        private categoriesService: SettingsCategoriesService,
        private weightsService: CategoryWeightsService,
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
    this.weightsService.getWeights().subscribe(results => {
        console.log(results);
    })
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
    * If there are any categories associated to the skill type,
    * set the array to the selected categories to the array
    * @param skillType: selected skill type
    */
   editSkillType(skillType) {
        this.error = true;
        this.total = 0;    
        this.skillType = {
            title: skillType.title,
            skillTypeId: skillType.skillTypeId,
            categories: skillType.categories,
            isActive: false
        };
        

        skillType.categories.forEach(category => {
            this.weightsService.getWeightByIds(this.skillType.skillTypeId, category.categoryId).subscribe(result => {
                this.allWeights.push(result);
                this.resetCategories(skillType, null);
                this.equalsMax(skillType);
            })
        })
    }

    /**
     * Resets Categories displayed on the edit modal
     * @param skillType: selected SkillType
     * @param category: selected Category
     */
    resetCategories(skillType: SkillType, category: Category){
        if(category){
            if(!this.allCategories.includes(category)){
                this.allCategories.push(category);
            }
        }

        skillType.categories.forEach(hasCat => {
            this.allCategories.forEach(same => {
                if(same.title === hasCat.title){
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

    /**
     * Sets skillType to be deleted
     *
     * @param skillType: skillType selected
     */
    confirmDelete(skillType: SkillType){
        this.skillType = skillType;
      }

    /**
     * Deletes skill type and repopulates the list
     */
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
                title: null,
                skillTypeId: null,
                categories: [],
                isActive: false
            };
        }

        if (this.skillType) {
            this.weight = new CategoryWeight;
            this.weight = {
                weightId: +(this.skillType.skillTypeId + "" + category.categoryId) ,
                // weightId: 0,
                skillTypeId: this.skillType.skillTypeId,
                categoryId: category.categoryId,
                weight: 0
            };
            
            this.weightsService.createWeight(this.weight).subscribe(result => {
                this.weight = result;
            })   
        }

        this.allWeights.push(this.weight);
        this.skillType.categories.push(category);
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
        this.allWeights.forEach(weight => {
            if(category.categoryId === weight.categoryId){
                this.weightsService.deleteWeight(this.skillType, category).subscribe(result => {
                    this.allWeights.splice(this.allWeights.indexOf(weight), 1);
                })
            }
        });
        this.resetCategories(this.skillType, category);
        this.equalsMax(this.skillType);
    }

    /**
     * Updates skill type and repopulates the list
     */
    skillTypeUpdate(skillType: SkillType) {
        this.skillTypeService.updateSkillType(skillType).subscribe(results => {
            this.grabAllSkillTypes();
        });

        this.skillType.categories.forEach(category => {
            this.allWeights.forEach(weight =>{
                this.weightsService.updateWeight(skillType, category, weight).subscribe(result => {
                    this.grabAllSkillTypes();
                });
            });
        });
    }

    /**
     * An onchange callback function that changes the weight of a category associated to a skill type
     *
     * @param skillType: skillType selected
     * @param category: category associated with skillType that was altered
     * @param weight: new value of weight assigned to a category
     */
    weightChange(skillType: SkillType, category: Category, weight: number){
        if(weight <= 0 || weight > 100){
            this.error = true;
            this.errorMessage = "Invalid Weight Value!";
        }
        else{
            this.errorMessage = '';
            this.allWeights.forEach(eachWeight => {
                if(category.categoryId === eachWeight.categoryId){
                    eachWeight.weight = weight;
                }
            });

            this.equalsMax(skillType);
        }
    }

    /**`
     * Validates whether weights assigned to categories within a skill type equal 100.
     *
     * @param skillType: skillType selected
     */
    equalsMax(skillType: SkillType){
        this.total = 0;
        console.log("EQMAX")
        this.allWeights.forEach(weight => {
            console.log("EQ Weight")
            this.total = this.total + weight.weight;
            console.log(this.total);
            if(this.total == 100){
                this.error = false;
            }
            else if(this.total > 100){
                this.error = true;
                this.errorMessage = "Total cannot be over 100";
            }
            else{
                this.error = true;
            }
        });
    }

    /**
    * Creates a new skill type to be created
    * Grabs all the skill types after the information has been submitted
    * @param modal: Form information from the modal, with parameters matching the SkillType entity
    */
    createNewSkillType(modal: SkillType) {
        this.skillType = modal;
        this.skillTypeService.createSkillType(this.skillType).subscribe(results => {
            this.grabAllSkillTypes();
        });
        this.savedSuccessfully();
    }

    /**
     * Sets a blank skillType object that would be populated with values.
     */
    setNewSkillType(){
        this.skillType = {
            skillTypeId: 0,
            title: '',
            categories: [],
            isActive: false
        }
        this.total = 0;
        this.equalsMax(this.skillType);
    }

    /**
    * Resets all fields that were used for the modal
    */
    resetFields() {
        if(this.skillType.skillTypeId){
            this.skillTypeService.getSkillTypeById(this.skillType.skillTypeId).subscribe(result => {
                this.allWeights.forEach(weight => {
                    this.categoriesService.getCategoryById(weight.categoryId).subscribe(category => {
                        if(!result.categories.includes(category)){
                            this.weightsService.deleteWeight(this.skillType, category).subscribe(result => {
                                
                            });
                        }
                    });
                });

                if(this.skillType){
                    this.skillType.categories.forEach(category => {
                        if(!result.categories.includes(category))
                            this.skillType.categories.splice(this.skillType.categories.indexOf(category), 1);
                    });
                }
            });
        }

        this.skillType = null;
        this.allSkillTypes =  [];
        this.allWeights = [];
        this.error = false;
        this.grabAllCategories();
        this.grabAllSkillTypes();
    }

    /**
     * Shows a popup on success.
     */
    savedSuccessfully() {
        this.alertsService.success('Saved successfully');
    }
}
