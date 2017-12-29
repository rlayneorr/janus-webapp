import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// components
import { Grade } from '../../entities/Grade';

// services
import { BatchService } from '../../services/batch.service';
import { TrainerService } from '../../services/trainer.service';
import { TraineeService } from '../../services/trainee.service';
import { AssessmentService } from '../../services/assessment.service';
import { GradeService } from '../../services/grade.service';
import { NoteService } from '../../services/note.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private data: any[];


  constructor(private service: GradeService) {
    this.service = service;
  }

  private log(object: any): void {
    console.log(object);
  }

  // private testCreate(): void {
  //   const test = Object.assign({}, this.data[0]);

  //   console.log(test);

  //   this.service.create(test);
  // }

  ngOnInit() {
    this.subscription = this.service.getList().subscribe( (data) => {
      this.data = data;
      this.log(this.data);

      // if ( this.data.length > 0 ) {
      //   this.testCreate();
      // }
    });

    // this.service.fetchAll();
    // this.service.fetchAllByBatch(3002);
    this.service.fetchByBatchIdByWeek(2201, 1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
