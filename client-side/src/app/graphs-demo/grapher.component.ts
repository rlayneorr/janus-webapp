import { Component, OnInit } from '@angular/core';

/**
 * @author John Hudson
 */

@Component({
  selector: 'app-grapher',
  templateUrl: './grapher.component.html',
  styleUrls: ['./grapher.component.css']
})
export class GrapherComponent implements OnInit {

  public barBatchWeekSorted: any = [{
    data:
      new Map([
        ['Average', 78.164],
      ]), label: 'Average'
  }, {
    data:
      new Map([
        ['person a1', 94.4],
        ['person b12', 85.1],
        ['person c123', 76.1],
        ['person d112', 75.1],
        ['person e12', 60.12]
      ]), label: 'batch'
  }];
  public radarBatchOverall: any = [{
    data: new Map([
      ['AWS', 88.75],
      ['Hibernate', 75.24],
      ['JSP', 77.77],
      ['Java', 63.77],
      ['Javascript', 77.47],
      ['REST', 74.27],
      ['SOAP', 74.27],
      ['SQL', 84.96],
      ['Spring', 87.10]
    ]), label: 'Batch'
  }];
  public radarBatchOverallwithTrainees: any = [
    {
      data: new Map([
        ['AWS', 88.75],
        ['Hibernate', 75.24],
        ['JSP', 77.77],
        ['Java', 63.77],
        ['Javascript', 77.47],
        ['REST', 74.27],
        ['SOAP', 74.27],
        ['SQL', 84.96],
        ['Spring', 87.10]
      ]), label: 'Batch'
    },
    {
      data: new Map([
        ['AWS', 98.75],
        ['Hibernate', 65.24],
        ['JSP', 57.77],
        ['Java', 93.77],
        ['Javascript', 57.47],
        ['REST', 94.27],
        ['SOAP', 94.27],
        ['SQL', 54.96],
        ['Spring', 67.10]
      ]), label: 'steve'
    }
  ];
  public qcDonutData: any = [{
    data: new Map([
      ['Superstar', 10],
      ['Good', 10],
      ['Average', 10],
      ['Poor', 10]
    ]), label: 'batch'
  }];
  public lineBatchWeeklyAverage: any = [{
    data: new Map([
      [1, 90.1],
      [2, 34.12],
      [3, 92.1],
      [10, 66.42]
    ]), label: 'batch'
  }];
  public barAssignAver: any = [{
    data: new Map([
      ['Project', 80.2],
      ['Exam', 60.1],
      ['Verbal', 85.2]
    ]), label: ''
  }];
  public barAssignAverToTrainee: any = [{
    data: new Map([
      ['Project', 80.2],
      ['Exam', 60.1],
      ['Other', 70.1],
      ['Verbal', 85.2]
    ]), label: 'Batch'
  },
  {
    data: new Map([
      ['Project', 90.2],
      ['Exam', 50.1],
      ['Other', 60.1],
      ['Verbal', 75.2]
    ]), label: 'Steve'
  }];
  public lineBatchWeeklyAverageToTrainer: any = [{
    data: new Map([
      [1, 90.1],
      [2, 64.12],
      [3, 92.1],
      [4, 66.4]
    ]), label: 'batch'
  },
  {
    data: new Map([
      [1, 80.1],
      [2, 54.12],
      [3, 72.1],
      [4, 86.4]
    ]), label: 'Steve'
  }];
  public types: string[] = ['line', 'radar', 'bar', 'doughnut'];
  public tableLabels: Array<any> = [];
  // public randomize(): void {
  //   const _chartData = new Array(this.chartData.length);
  //   for (let i = 0; i < this.chartData.length; i++) {
  //     _chartData[i] = { data: new Array(this.chartData[i].data.length), label: this.chartData[i].label };
  //     for (let j = 0; j < this.chartData[i].data.length; j++) {
  //       _chartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.chartData = _chartData;
  //   // this.result.emit(this.chartData);
  // }
  // public lineWeekLabel(): Array<any> {
  //   const newLinetableLabels: Array<any> = new Array(this.chartData[0].data.length);
  //   for (let i = 0; i < newLinetableLabels.length; i++) {
  //     newLinetableLabels[i] = 'Week' + (i + 1);
  //   }
  //   return newLinetableLabels;
  // }
  ngOnInit() {
    // this.tableLabels = this.lineWeekLabel();
  }

  ngOnChange(val: Array<any>) {
    // this.chartData = val;
  }
}

