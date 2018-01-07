import { Component, OnInit } from '@angular/core';

import { Note } from '../../entities/Note';

@Component({
  selector: 'app-overall-feedback',
  templateUrl: './overall-feedback.component.html',
  styleUrls: ['./overall-feedback.component.css']
})
export class OverallFeedbackComponent implements OnInit {
  private batchNote: Note;

  constructor() { }

  ngOnInit() {
  }

}
