import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { Bucket } from '../entities/Bucket';
import { Category } from '../entities/Category';
import { SkillTypesService } from '../services/skillTypes.service';
import { BucketsService } from '../services/buckets.service';
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


    public allCategories: Category[] = [];
    public allBuckets: Bucket[] = [];
    public skillType: SkillType;
    public categoryBuckets: Bucket[];
    public error: boolean;
    public modalServiceRef;
    public categoryIds: number[] = [];

    public category: Category;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private skillTypeService: SkillTypesService,
        private bucketsService: BucketsService,
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
        console.log(this.allCategories);
        });
    }

    /**
    * Grabs all buckets and stores the information into a variable
    */
   grabAllBuckets() {
    this.bucketsService.getAllBuckets().subscribe(results => {
        this.allBuckets = results;
        console.log(this.allBuckets);
        });
    }
    
    // removeElement(item: any) {
    //     let thing: any;
    //     for (let i = 0; i < this.allSkillTypes.length; i++) {
    //         thing = this.allSkillTypes[i];
    //         if (thing.skillTypeName === item.skillTypeName) {
    //             if (thing.isActive) {
    //                 thing.isActive = !thing.isActive;
    //                 this.skillTypeService.deactivateSkillType(thing.skillTypeId).subscribe();
    //             } else {
    //                 thing.isActive = !thing.isActive;
    //                 this.skillTypeService.activateSkillType(thing.skillTypeId).subscribe();
    //             }
    //         }
    //         // this.setSkillTypes();
    //     }
    // }


    // setSkillTypes() {
    //     let thing: SkillType;
    //     this.skillTypes = [];
    //     this.inactiveSkillTypes = [];
    //     for (let i = 0; i < this.allSkillTypes.length; i++) {
    //         thing = this.allSkillTypes[i];
    //         if (thing.isActive === true) {
    //             this.skillTypes[this.skillTypes.length] = thing;
    //         } else if (thing.isActive === false) {
    //             this.inactiveSkillTypes[this.inactiveSkillTypes.length] = thing;
    //         }
    //     }
    // }

    skillTypeUpdate(skillType: SkillType) {
        this.skillTypeService.updateSkillType(skillType).subscribe(results => {
            this.grabAllSkillTypes();
        });
    }

    /**
    * Opens the modal for creating and editing skill SkillType
    * Resets fields clears the data within set fields
    * Creates a variable to reference the open modal service
    */
    open(content) {
        this.modalServiceRef = this.modalService.open(content);
        this.modalServiceRef.result.then((result) => {
            this.resetFields();
        }, (reason) => {
            this.resetFields();
        });
        event.stopPropagation();
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

        console.log(this.skillType.categories)
        // this.skillTypeService.getSkillTypeCategories(skillType.skillTypeId).subscribe(results => {
        //     for (let i = 0; i < results.length; i++) {
        //         this.categoryIds.push(results[i].bucketId);
        //     }
        // });
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
        //     // this auto sets weights for all buckets assigned to zero.
        //     this.singleSkillType.weights.push(0);
        //     this.singleSkillTypeBucketIds.push(bucket.bucketId);
        //     this.combineBucketsAndWeights();
        }
        console.log(this.skillType)
    }

    /**
    * Removes all references to the bucket that is associated to the skill type
    * @param bucket: bucket object to be removed from all associates to the skill type
    */
    removeCategories(category) {
        if (this.skillType) {
            for (const singleBucketIndex in this.skillType.categories) {
                if (this.skillType.categories[singleBucketIndex] === category) {
        //             this.skillType.weights.splice(Number(singleBucketIndex), 1);
        //             this.skillTypeBucketIds.splice(Number(singleBucketIndex), 1);
        //             this.bucketsAndWeights.splice(Number(singleBucketIndex), 1);
                    this.skillType.categories.splice(Number(singleBucketIndex), 1);
                }
            }
        //     this.combineBucketsAndWeights();
        }
    }

    /**
    * If there are existing buckets, set the current weight percent to the skill types so when
    * it combines the buckets and weights fields, it has updated data.
    * Clear the array holding the buckets and weights information.
    * Combines the buckets and weights field of the selected skill types
    */
    combineCategoriesAndWeights() {
        // if (this.bucketsAndWeights.length !== 0) {
        //     for (const index of this.bucketsAndWeights) {
        //         this.singleSkillType.weights[index] = this.bucketsAndWeights[index].weights;
        //     }
        // }
        // this.bucketsAndWeights = [];
        // for (const bucket of this.singleSkillType.buckets) {
        //     this.bucketsAndWeights.push({'bucketCategory': bucket.bucketCategory,
        //         'weights': this.singleSkillType.weights});
        // }
    }

    /**
    * Makes sure that the weight percentage input is within 0 and 100
    * @param index: Weight percentage of a single bucket.
    */
    // checkMinMax(index: number) {
    //     if (this.categoriesAndWeights[index].weights > 100) {
    //         this.categoriesAndWeights[index].weights = 100;
    //     } else if (this.categoriesAndWeights[index].weights < 0) {
    //         this.categoriesAndWeights[index].weights = 0;
    //     }
    // }

    /**
    * Updates the selected skill type with the added buckets and bucketWeightSum
    * If there are buckets added to the skill type, the weight percentage of the buckets
    * has to sum to 100. When the form is valid, the reference to the open modal will close
    * and an HTTP Request is sent to the endpoint to update the skill type and relations
    * If the buckets
    */
    updateSkillType(modal: SkillType) {
        this.skillType = modal;
        let addedBucket = false;
        // this.categoryWeightSum = 0;
        // if (this.categoriesAndWeights.length !== 0) {
        //     addedBucket = true;
        //     for (const index of this.categoriesAndWeights) {
        //         this.categoryWeightSum += this.categoriesAndWeights[index].weights;
        //     }
        // }
        // if (this.categoryWeightSum === 100 || this.categoriesAndWeights.length === 0) {
        //     this.modalServiceRef.close();
        //     const categoriesId = [];
        //     const weights = [];
        //     for (const index of this.categoriesAndWeights) {
        //         categoriesId.push(this.singleCategoryIds[index]);
        //         weights.push(this.categoriesAndWeights[index].weights);
        //     }
            // this.skillTypeService.updateSkillType(this.skillType).subscribe(results => {
            //     this.grabAllSkillTypes();
            // });
            this.savedSuccessfully();
        // } else {
        //     this.error = true;
        // }
    }

    /**
    * Creates a new skill type to be created
    * Grabs all the skill types after the information has been submitted
    * @param modal: Form information from the modal, with parameters matching the SkillType entity
    */

    createNewSkillType(modal: SkillType, categories: Category[]) {
        this.skillType = modal;
        this.skillType.categories = categories;
        console.log(this.skillType);
        this.skillTypeService.createSkillType(this.skillType).subscribe(results => {
            this.grabAllSkillTypes();
        });
        this.savedSuccessfully();
        console.log(modal);
    }

    /**
    * Checks the sum of bucket weights that are associated to the selected skill types
    * If there are buckets associated to the skill type and the sum is not 100, an error will appear and save button is disabled
    */
    // checkCategorySum() {
    //     this.categoryWeightSum = 0;
    //     for (const category of this.categoriesAndWeights) {
    //         this.bucketWeightSum += bucket.weights;
    //     }
    //     if (this.bucketsAndWeights.length === 0) {
    //         this.error = false;
    //     } else if (this.bucketWeightSum === 100) {
    //         this.error = false;
    //     } else {
    //         this.error = true;
    //     }
    // }

    /** used to compare SkillType Array to sort it based on status */
    // compare(a: SkillType, b: SkillType) {
    //     if (a.isActive) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // }

    /**
    * Resets all fields that were used for the modal
    */
    resetFields() {
        this.skillType = null;
        // this.bucketsAndWeights = [];
        this.error = false;
        this.categoryIds = [];
    }

    savedSuccessfully() {
        this.alertsService.success('Saved successfully');
    }
}
