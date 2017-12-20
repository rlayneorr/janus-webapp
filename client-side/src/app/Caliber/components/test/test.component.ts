import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BatchService } from '../../services/batch.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private service: BatchService;


  constructor(batchService: BatchService) {
    this.service = batchService;
  }

  private log(object: any): void {
    console.log(object);
  }

  ngOnInit() {
    this.subscription = this.service.getList().subscribe( (batches) => {
      this.log(batches);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
