import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weekly-feedback',
  templateUrl: './weekly-feedback.component.html',
  styleUrls: ['./weekly-feedback.component.css']
})
export class WeeklyFeedbackComponent implements OnInit, OnDestroy {



  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
