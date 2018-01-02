import { Injectable } from '@angular/core';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { WeeklyProgress } from '../../entities/weeklyProgress';
import { DataSet } from '../../entities/DataSet';
import { ColorService } from '../colors/color.service';

@Injectable()
export class VpHomeLineGraphService {
  public lineChartData = new ChartDataEntity();
  constructor(private cs: ColorService) {
    this.cs.setVPHomeLineColors([this.lineChartData.mainColor, this.lineChartData.secondaryColor]);
  }

  public getLineChartData() {
    const lcd = new ChartDataEntity();
    lcd.colors = [lcd.mainColor, lcd.secondaryColor];
    lcd.options = {
        legend: {
            display: true,
            labels: {
                boxWidth: 10
            }
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Week'
                }

            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Score'
                },

                ticks: {
                    suggestedMin: 40,
                    suggestedMax: 100,
                    stepSize: 20
                }
            }]
        },
        datasetFill: false,
        tooltips: {
            mode: 'x',
        },
    };
    lcd.data = [];
    lcd.type = 'line';
    return lcd;

  }

  public fillChartData(results: Array<WeeklyProgress>, lcd: ChartDataEntity, state: string, city: string) {
    let holder;
    lcd = this.clearLineChartData(lcd);
    if (state !== '') {
      holder = results.filter(i => i.address.state === state);
      if (city !== '') {
        holder = holder.filter(i => i.address.city === city);
      }
    } else {
      holder = results;
    }
    let highestWeek = 0;
    for (const item of holder) {
      let currentWeek = 1;
      const dataHolder = new DataSet();
      dataHolder.fill = false;
      dataHolder.label = item.label;
      let iterator = 0;
      const keys = Object.keys(item.grades);
      for (const key of keys) {
        while (currentWeek < Number(keys[iterator])) {
          dataHolder.data.push(0);
          currentWeek++;
        }
        dataHolder.data.push(item.grades[key].toFixed(2));
        currentWeek++;
        if (currentWeek > highestWeek) {
          highestWeek = currentWeek;
        }
        iterator++;
      }
      lcd.data.push(dataHolder);
    }
    for (let i = 1; i < highestWeek; i++) {
      lcd.labels.push('Week ' + i);
    }
    lcd.colors = this.cs.getLineColors(lcd.data.length);
    console.log(lcd);
    return lcd;
  }

  private clearLineChartData(lcd: ChartDataEntity) {
    lcd.data.length = 0;
    lcd.labels.length = 0;
    lcd.colors.length = 0;
    return lcd;
  }
}
