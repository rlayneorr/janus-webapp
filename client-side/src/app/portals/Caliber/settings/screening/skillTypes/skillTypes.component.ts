import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
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
    public allBuckets: Bucket[] = [];
    public skillType: SkillType;
    public categoryBuckets: Bucket[];
    public error: boolean;

    public category: Category;
    public total: number;

    constructor(
        private modalService: NgbModal,
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
        this.modalService.open(content).result.then((result) => {
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
     * Updates skill type and repopulates the list
     */
    skillTypeUpdate(skillType: SkillType) {
        this.skillTypeService.updateSkillType(skillType).subscribe(results => {
            this.grabAllSkillTypes();
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
        skillType.categories[skillType.categories.indexOf(category)].categoryWeight.weight = weight;
        console.log(skillType.categories);
        this.equalsMax(skillType);
    }

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
