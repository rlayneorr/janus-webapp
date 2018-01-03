import { Injectable } from '@angular/core';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { DataSet } from '../../entities/DataSet';
import { ColorService } from '../colors/color.service';

@Injectable()
export class VpHomeBarGraphService {

  constructor(private cs: ColorService) { }

  public getBarChartData(): ChartDataEntity {
    const barChartData = new ChartDataEntity();
    barChartData.options = {
      legend: {
        display: true,
        labels: {
          boxWidth: 10
        }
      },
      tooltips: {
        itemSort: function (a, b) { return b.datasetIndex - a.datasetIndex; },
        mode: 'x',
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            mirror: true
          }
        }],
        xAxes: [{
          stacked: true,
          ticks: {
            mirror: true
          }
        }]
      }
    };
    barChartData.data = [];
    barChartData.type = 'bar';
    return barChartData;
  }
  public fillChartData(results: any, barChartData: ChartDataEntity, state: string, city: string): ChartDataEntity {
    let holder;
    barChartData = this.clearBarChartData(barChartData);
    if (state !== '') {
      holder = results.filter(i => i.address.state === state);
      if (city !== '') {
        holder = holder.filter(i => i.address.city === city);
      }
    }
    let chartnum = 1;
    for (const result of results) {
      console.log('result');
      console.log(result);
      barChartData.labels.push(result.label);
      // barChartData.id.push(result.id);
      let i = 0;
      for (const key of Object.keys(result.qcStatus)) {
        if (key === 'Poor') {
          i = 0;
          barChartData.colors[i] = this.cs.generateLineColor('rgba(234, 40, 37,');
        } else if (key === 'Average') {
          i = 1;
          barChartData.colors[i] = this.cs.generateLineColor('rgba(249, 233, 0,');
        } else if (key === 'Good') {
          i = 2;
          barChartData.colors[i] = this.cs.generateLineColor('rgba(24, 173, 24,');
        } else if (key === 'Superstar') {
          i = 3;
          barChartData.colors[i] = this.cs.generateLineColor('rgba(57, 63, 239,');
        }
        if (barChartData.data[i] === undefined) {
          const dataset = new DataSet();
          dataset.data.push(result.qcStatus[key]);
          dataset.label = key;
          dataset.id = result.id;
          dataset.stack = '' + chartnum;
          barChartData.data[i] = dataset;
        }
      }
      chartnum++;
    }

    return barChartData;
  }

  private clearBarChartData(barChartData: ChartDataEntity): ChartDataEntity {
    barChartData.colors.length = 0;
    barChartData.data.length = 0;
    barChartData.labels.length = 0;
    return barChartData;
  }
}
