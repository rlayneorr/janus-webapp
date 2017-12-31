import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChuckNorrisService } from '../../services/chuck-norris.service';
import { Http } from '@angular/http/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../assets/css/styles.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private batches: any;
  constructor(private http: Http) { }

  ngOnInit() {
    console.log('home component request');
    this.http.get('http://localhost:8080/qc/batch/all').subscribe(
       (resp) => {
          this.batches = resp.json();
      });
  }

  // clean up subscriptions
  ngOnDestroy() {

  }
}
