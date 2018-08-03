import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-panel-overall-feedback',
  templateUrl: './panel-overall-feedback.component.html',
  styleUrls: ['./panel-overall-feedback.component.css']
})
export class PanelOverallFeedbackComponent implements OnInit {

  @Input() overallFeedback: FormGroup;

  constructor() {
    this.overallFeedback = new FormGroup({
      duration: new FormControl(),
      recordingLink: new FormControl(),
      status: new FormControl(),
      overall: new FormControl()
    });
  }

  ngOnInit() {}

}
