import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http/';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { Dependencies } from '../../caliber.test.module';

import { GraphComponent } from './graph.component';

/**
 * If you wish to run these test, you must comment out everything from OnInit from the .ts file
 * Code Coverage is standing around 80 percent with the onInit commented out
 */
xdescribe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('chartClicked(e) shouldn`t do anything (due to no implementation)', () => {
    component.chartClicked(event);
  });

  it('chartHovered(e) shouldn`t do anything (due to no implementation)', () => {
    component.chartHovered(event);
  });

  it('fillColor(blue) should return { backgroundColor: rgba(blue, .5), pointBackgroundColor: rgba(blue, .5),'
    + 'borderColor: rgba(blue, 1), borderWidth: 2, pointHoverBackgroundColor: rgba(blue, .3),'
    + 'pointHoverBorderColor: rgba(blue, .3), pointBorderColor: #fff, fill: true }', () => {

    const test = { backgroundColor: 'rgba(blue, .5)', pointBackgroundColor: 'rgba(blue, .5)',
    borderColor: 'rgba(blue, 1)', borderWidth: 2, pointHoverBackgroundColor: 'rgba(blue, .3)',
    pointHoverBorderColor: 'rgba(blue, .3)', pointBorderColor: '#fff', fill: true };
    expect(component.fillColor('blue')).toEqual(test);
  });

  it('fillColor(#0000FF) should return backgroundColor: rgba(0,0,255, .5), pointBackgroundColor: rgba(0,0,255, .5),'
    + 'borderColor: rgba(0,0,255, 1), borderWidth: 2, pointHoverBackgroundColor: rgba(0,0,255, .3),'
    + 'pointHoverBorderColor: rgba(0,0,255, .3), pointBorderColor: #fff, fill: true }', () => {

    const test = { backgroundColor: 'rgba(0,0,255, .5)', pointBackgroundColor: 'rgba(0,0,255, .5)',
    borderColor: 'rgba(0,0,255, 1)', borderWidth: 2, pointHoverBackgroundColor: 'rgba(0,0,255, .3)',
    pointHoverBorderColor: 'rgba(0,0,255, .3)', pointBorderColor: '#fff', fill: true };

    expect(component.fillColor('#0000FF')).toEqual(test);
  });

  it('emptyColor(blue) should return backgroundColor: rgba(blue, .5), pointBackgroundColor: rgba(blue, .5),'
  + 'borderColor: rgba(blue, 1), borderWidth: 2, pointHoverBackgroundColor: rgba(blue, .3), pointHoverBorderColor: rgba(blue, .3),'
  + 'pointBorderColor: #fff, fill: false }', () => {

    const test = { backgroundColor: 'rgba(blue, .5)', pointBackgroundColor: 'rgba(blue, .5)',
      borderColor: 'rgba(blue, 1)', borderWidth: 2, pointHoverBackgroundColor: 'rgba(blue, .3)',
      pointHoverBorderColor: 'rgba(blue, .3)', pointBorderColor: '#fff', fill: false };

    component.fillColor('blue');
    expect(component.emptyColor('blue')).toEqual(test);
  });

  // Can't really test this method because the return string is random
  it('randColString() should return a random color String', () => {
    component.randColString();
  });

  it('hsvToRgb(100, 100, 100), should return [ 85, 255, 0 ]', () => {
    const test = [ 85, 255, 0 ];
    expect(component.hsvToRgb(100, 100, 100)).toEqual(test);
  });

  it('hsvToRgB(100, 0, 100) should return [ 255, 255, 255 ]', () => {
    const test = [ 255, 255, 255 ];
    expect(component.hsvToRgb(100, 0, 100)).toEqual(test);
  });

  it('hsvToRgb(0, 100, 100), should return [ 255, 0, 0 ]', () => {
    const test = [ 255, 0, 0 ];
    expect(component.hsvToRgb(0, 100, 100)).toEqual(test);
  });

  it('hsvToRgb(120, 100, 100), should return  [0, 255, 0 ]', () => {
    const test =  [0, 255, 0 ];
    expect(component.hsvToRgb(120, 100, 100)).toEqual(test);
  });

  it('hsvToRgb(180, 100, 100), should return [ 0, 255, 255 ] ', () => {
    const test = [ 0, 255, 255 ] ;
    expect(component.hsvToRgb(180, 100, 100)).toEqual(test);
  });

  it('hsvToRgb(240, 100, 100), should return [ 0, 0, 255 ]', () => {
    const test = [ 0, 0, 255 ];
    expect(component.hsvToRgb(240, 100, 100)).toEqual(test);
  });

  it('hsvToRgb(300, 100, 100), should return [ 255, 0, 255 ]', () => {
    const test = [ 255, 0, 255 ];
    expect(component.hsvToRgb(300, 100, 100)).toEqual(test);
  });

  it('benchMarkColor() should return { pointRadius: 0, pointHoverRadius: 0, borderWidth: 3, borderColor: rgba(252,180,20,1),'
  + 'backgroundColor: rgba(252,180,20, .5), pointBackgroundColor: rgba(252,180,20,1), pointHoverBackgroundColor: rgba(252,180,20,1),'
  + 'pointHoverBorderColor: rgba(252,180,200, 0.5), fill: false, label: Benchmark, pointBorderColor: #fff }', () => {

    const test = {pointRadius: 0, pointHoverRadius: 0, borderWidth: 3, borderColor: 'rgba(252,180,20,1)',
      backgroundColor: 'rgba(252,180,20, .5) ', pointBackgroundColor: 'rgba(252,180,20,1)',
      pointHoverBackgroundColor: 'rgba(252,180,20,1)', pointHoverBorderColor: 'rgba(252,180,200, 0.5)', fill: false,
      label: 'Benchmark', pointBorderColor: '#fff' };
    expect(component.benchMarkColor()).toEqual(test);
  });

  it('chartOption(radar) should return { responsive: true, tooltips: Object({ mode: label }), scale: Object({ ticks: Object({'
    + 'beginAtZero: false, fixedStepSize: 10, max: 100, suggestedMin: 40 }) }) }', () => {

    const test = { responsive: true, tooltips: Object({ mode: 'label' }), scale: Object({
        ticks: Object({ beginAtZero: false, fixedStepSize: 10, max: 100, suggestedMin: 40 }) }) };

    expect(component.chartOption('radar')).toEqual(test);
  });

  it('chartOption(bar) should return { responsive: true, tooltips: Object({ mode: label }), scales: Object({ yAxes: [ Object({'
    + 'ticks: Object({beginAtZero: false, fixedStepSize: 20, max: 100, suggestedMin: 40 }), scaleLabel: Object({ display: true,'
    + 'labelString: Average }) }) ], xAxes: [ Object({ ticks: Object({ autoSkip: false }) }) ] }) }', () => {

    const test = { responsive: true, tooltips: Object({ mode: 'label' }), scales: Object({ yAxes: [ Object({ ticks: Object({
      beginAtZero: false, fixedStepSize: 20, max: 100, suggestedMin: 40 }), scaleLabel: Object({
        display: true, labelString: 'Average' }) }) ], xAxes: [ Object({ ticks: Object({ autoSkip: false }) }) ] }) };

    expect(component.chartOption('bar')).toEqual(test);
  });

  it('chartOption(barAverageCompare) should return { responsive: true, tooltips: Object({ mode: label }), scales: Object({ yAxes:'
    + '[ Object({ ticks: Object({ beginAtZero: false, fixedStepSize: 20, max: 100, suggestedMin: 40 }), scaleLabel: Object({'
    + 'display: true, labelString: Average }) }) ], xAxes: [ Object({ ticks: Object({ autoSkip: false }) }) ] }) }', () => {

    const test = { responsive: true, tooltips: Object({ mode: 'label' }), scales: Object({ yAxes: [ Object({
      ticks: Object({ beginAtZero: false, fixedStepSize: 20, max: 100, suggestedMin: 40 }), scaleLabel: Object({
      display: true, labelString: 'Average' }) }) ], xAxes: [ Object({ ticks: Object({ autoSkip: false }) }) ] }) };

    expect(component.chartOption('barAverageCompare')).toEqual(test);
  });

  it('chartOption(line) should return ', () => {
    const test = { responsive: true, tooltips: Object({ mode: 'label' }), scales: Object({
      yAxes: [ Object({ ticks: Object({ beginAtZero: false, fixedStepSize: 20, max: 100, suggestedMin: 40 }),
        scaleLabel: Object({ display: true, labelString: 'Average' }) }) ], xAxes: [ Object({ scaleLabel: Object({
          display: true, labelString: 'Week' }) }) ] }) };

    expect(component.chartOption('line')).toEqual(test);
  });
});
