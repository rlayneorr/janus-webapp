
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { forEach } from '@uirouter/angular';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() legend: boolean;
  @Input() type: string;


  public chartMaps: any = null;
  public chartData: any[] = null;
  public chartLabels: any[] = null;
  public chartLegend = false;
  public chartType: string = null;
  public chartOptions: any = {
    responsive: true
  };
  public chartColors: Array<any> = [];

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
  ngOnInit() {
    this.chartMaps = this.data;
    this.chartType = this.type;
    this.chartLegend = this.legend;

    const _chartData: any[] = [];
    const _chartLabels: string[] = [];
    let label = true;
    // gets data from input
    for (const chartMap of this.chartMaps) {
      const _chartDataRow: number[] = [];
      chartMap.data.forEach((value: number, key: string) => {
        _chartDataRow.push(value);
        if (label) {
          _chartLabels.push(key);
        }
      });
      label = false;
      _chartData.push({ data: _chartDataRow, label: chartMap.label });
    }


    switch (this.chartType) {
      case 'radar':
        this.chartColors = [
          this.color('114, 164, 194'),
          this.color('242, 105, 37'),
          this.color('71, 76, 85'),
          this.color('252, 180, 20'),
          this.color('0, 160, 0')];
        this.chartOptions = this.chartOption(this.chartType);
        break;
      case 'bar':
        if (_chartData[1] === undefined || (_chartData[1] !== undefined && _chartData[1].data.length !== 1)) {
          this.chartColors = [
            this.color('114, 164, 194'),
            this.color('252, 180, 20')
          ];
          this.chartOptions = this.chartOption(this.chartType);
        } else {
          this.chartColors = [
            this.color('114, 164, 194'),
            // this.color('252, 180, 20')
            {
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              borderColor: 'rgba(252,180,20,1)',
              backgroundColor: 'rgba(252,180,20, .5) ',
              pointBackgroundColor: 'rgba(252,180,20,1)',
              pointHoverBackgroundColor: 'rgba(252,180,20,1)',
              pointHoverBorderColor: 'rgba(252,180,200, 0.5)',
              fill: false,
              label: 'Benchmark',
              pointBorderColor: '#fff'
            }
          ];
          _chartData[0].label = 'Batch Scores';
          _chartData[1].type = 'line';
          const benchmarkData: number[] = [];
          const benchmark = _chartData[1].data[0];
          forEach(_chartData[0].data, function () {
            benchmarkData.push(benchmark);
          });
          _chartData[1].data = benchmarkData;
          this.chartOptions = this.chartOption('barAverageCompare');
        }
        break;
      case 'line':
        this.chartColors = [
          this.color('114, 164, 194'),
          this.color('252, 180, 20')
        ];
        this.chartOptions = this.chartOption(this.chartType);
        break;
      case 'doughnut':
        // doughnut colors are weird for some reason
        const _chartColors: any[] = [{ backgroundColor: [] }];
        let doughnutColor = '114, 164, 194';
        forEach(_chartLabels, function (doughnutLabel) {
          if (doughnutLabel === 'Superstar') {
            doughnutColor = '57, 63, 239';
          } else if (doughnutLabel === 'Good') {
            doughnutColor = '24, 173, 24';
          } else if (doughnutLabel === 'Average') {
            doughnutColor = '249, 233, 0';
          } else if (doughnutLabel === 'Poor') {
            doughnutColor = '234, 40, 37';
          }
          _chartColors[0].backgroundColor.push('rgba(' + doughnutColor + ', .5)');
        });
        this.chartColors = _chartColors;
        break;
    }



    this.chartData = _chartData;
    this.chartLabels = _chartLabels;
  }
  ngOnChanges(changes) {
    if (changes['data']) {
      this.ngOnInit();
    }
  }

  // returns an object for chart color info
  color(input: string) {
    return {
      backgroundColor: 'rgba(' + input + ', .5)',
      pointBackgroundColor: 'rgba(' + input + ', .5)',
      borderColor: 'rgba(' + input + ', 1)',
      pointHoverBackgroundColor: 'rgba(' + input + ', .3)',
      pointHoverBorderColor: 'rgba(' + input + ', .3)',
      pointBorderColor: '#fff'
    };
  }
  // returns an object for chart options
  chartOption(_chartType: string) {
    if (_chartType === 'radar') {
      return {
        responsive: true,
        scale: {
          ticks: {
            beginAtZero: false,
            fixedStepSize: 10,
            max: 100,
            suggestedMin: 40
          }
        }
      };
    } else if (_chartType === 'bar') {
      return {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              fixedStepSize: 10,
              max: 100,
              suggestedMin: 40
            },
            scaleLabel: {
              display: true,
              labelString: 'Average'
            }
          }]
        }
      };
    } else if (_chartType === 'line') {
      return {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              fixedStepSize: 10,
              max: 100,
              suggestedMin: 40
            },
            scaleLabel: {
              display: true,
              labelString: 'Average'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Week'
            }
          }]
        }
      };
    } else if (_chartType === 'barAverageCompare') {
      return {
        responsive: true,
        legend: {
          reverse: true
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']];
            },
            label: function (tooltipItem, data) {
              return [data['datasets'][0]['data'][tooltipItem['index']], data['datasets'][1]['data'][tooltipItem['index']]];
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              fixedStepSize: 10,
              max: 100,
              suggestedMin: 40
            },
            scaleLabel: {
              display: true,
              labelString: 'Average'
            }
          }]
        }
      };
    }
  }
}

