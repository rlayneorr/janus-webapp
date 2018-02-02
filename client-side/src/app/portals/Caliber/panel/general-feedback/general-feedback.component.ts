import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms/';

@Component({
  selector: 'app-general-feedback',
  templateUrl: './general-feedback.component.html',
  styleUrls: ['./general-feedback.component.css']
})
export class GeneralFeedbackComponent implements OnInit {

  @Input() generalFeedback: FormGroup;

  constructor() {
    this.generalFeedback = new FormGroup({
      associateIntro: new FormControl(),
      projectOneDescription: new FormControl(),
      projectTwoDescription: new FormControl(),
      projectThreeDescription: new FormControl(),
      communicationSkills: new FormControl()
    });
   }

  ngOnInit() {
  }

}
