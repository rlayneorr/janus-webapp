import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }
  public batchId = 2201;
  public traineeList = [5528, 5535, 5526, 5530, 5536, 5529, 5534, 5533, 5524, 5532, 5538, 5537, 5525, 5539, 5527];
  ngOnInit() {
  }

}
