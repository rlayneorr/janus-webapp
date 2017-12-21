import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportingService {

  constructor() { }

  /*  Reports Charts */


  refresh() {
    // Clear all data stored in subjects
  }

  /*
  =================================
          API CALLS
  =================================
  */

  /**
   * Fetch the batch comparison average script
   * @param skill - Skill to compare
   * @param training - Training
   * @param date - Date
   * @returns Number - batch average for comparison
   */
  fetchBatchComparisonAvg(skill: string, training: string, startDate) {
    const endpoint = environment.apiBatchComparisonAvgEndpoint(skill, training, startDate);

    // Check if cache is fresh
    // if fresh
        // return
    // If not fresh, get data from backend
        // Push new data into subject
  }


  /* Doughnut / Pie charts */

  /**
   *
   * @param batchId batchId filter value
   * @param weekId weekId filter value
   */
  fetchBatchWeekPieChart(batchId: Number, weekId: Number) {
    const endpoint = environment.apifetchBatchWeekPieChart(batchId, weekId);

    // TODO: Implement API call and subject push logic

  }


  fetchPieChartCurrentWeekQCStatus(batchId: Number) {
    const endpoint = environment.apiPieChartCurrentWeekQCStatus(batchId);

    // TODO: Implement API call and subject push logic

  }

  /* Stacked Bar Charts */

  fetchAllBatchesCurrentWeekQCStackedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.apiAllBatchesCurrentWeekQCStackedBarChart(batchId, week);

    // TODO: Implement API call and subject push logic

  }

  /* Bar Charts */
  fetchBatchWeekAvgBarChart(batchId: Number, week: Number) {
    const endpoint = environment.apiBatchWeekAvgBarChart(batchId, week);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekSortedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.apiBatchWeekSortedBarChart(batchId, week);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallTraineeBarChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.apiBatchOverallTraineeBarChart(batchId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallBarChart(batchId: Number) {
    const endpoint = environment.apiBatchOverallBarChart(batchId);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekTraineeBarChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.apiBatchWeekTraineeBarChart(batchId, weekId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  /* Line Charts */
  fetchTraineeUpToWeekLineChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.apiTraineeUpToWeekLineChart(batchId, weekId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchTraineeOverallLineChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.apiTraineeOverallLineChart(batchId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallLineChart(batchId: Number) {
    const endpoint = environment.apiBatchOverallLineChart(batchId);

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentBatchesLineChart() {
    const endpoint = environment.apiCurrentBatchesLineChart;

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentPanelsLineChart() {
    const endpoint = environment.apiCurrentPanelsLineChart;

    // TODO: Implement API call and subject push logic

  }

  /* Radar Charts */

  fetchTraineeUpToWeekRadarChart(week: Number, traineeId: Number) {
    const endpoint = environment.apiTraineeUpToWeekRadarChart(week, traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchTraineeOverallRadarChart(traineeId: Number) {
    const endpoint = environment.apiTraineeOverallRadarChart(traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallRadarChart(batchId: Number) {
    const endpoint = environment.apiBatchOverallRadarChart(batchId);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchAllTraineesRadarChart(batchId: Number) {
    const endpoint = environment.apiBatchAllTraineesRadarChart(batchId);

    // TODO: Implement API call and subject push logic

  }

  /* Misc. */

  fetchBatchWeekAverageValue(batchId: Number, weekId: Number) {
    const endpoint = environment.apiBatchWeekAverageValue(batchId, weekId);

    // TODO: Implement API call and subject push logic

  }

  fetchTechnologiesForTheWeek(batchId: Number, weekId: Number) {
    const endpoint = environment.apiTechnologiesForTheWeek(batchId, weekId);

    // TODO: Implement API call and subject push logic

  }
}
