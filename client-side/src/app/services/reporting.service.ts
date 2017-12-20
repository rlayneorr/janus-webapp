import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportingService {

  constructor() { }

  /*  Reports Charts */

  /**
   * Fetch the batch comparison average script
   * @param skill - Skill to compare
   * @param training - Training
   * @param date - Date
   * @returns Number - batch average for comparison
   */
  fetchBatchComparisonAvg(skill: string, training: string, startDate) {
    const endpoint = environment.context + `/all/reports/compare/skill/${skill}/training/${training}/date/${startDate}`;

    // Check if cache is fresh
    // if fresh
        // return
    // If not fresh, get data from backend
        // Push new data into subject
  }

  refresh() {
    // Clear all data stored in subjects
  }

  /*
  =================================
          API CALLS
  =================================
  */

  /* Doughnut / Pie charts */

  /**
   *
   * @param batchId batchId filter value
   * @param weekId weekId filter value
   */
  fetchBatchWeekPieChart(batchId: Number, weekId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${weekId}/pie`;

    // TODO: Implement API call and subject push logic

  }


  fetchPieChartCurrentWeekQCStatus(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/{batchId}/chart`;

    // TODO: Implement API call and subject push logic

  }

  /* Stacked Bar Charts */

  fetchAllBatchesCurrentWeekQCStackedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`;

    // TODO: Implement API call and subject push logic

  }

  /* Bar Charts */
  fetchBatchWeekAvgBarChart(batchId: Number, week: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekSortedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-weekly-sorted`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallTraineeBarChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/bar-batch-overall-trainee`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallBarChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/bar-batch-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekTraineeBarChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/bar-batch-week-trainee`;

    // TODO: Implement API call and subject push logic

  }

  /* Line Charts */
  fetchTraineeUpToWeekLineChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/line-trainee-up-to-week`;

    // TODO: Implement API call and subject push logic

  }

  fetchTraineeOverallLineChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/line-trainee-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallLineChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/line-batch-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentBatchesLineChart() {
    const endpoint = environment.context + `all/reports/dashboard`;

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentPanelsLineChart() {
    const endpoint = environment.context = `all/reports/biweeklyPanelResults`;

    // TODO: Implement API call and subject push logic

  }

  /* Radar Charts */

  fetchTraineeUpToWeekRadarChart(week: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/week/${week}/trainee/${traineeId}/radar-trainee-up-to-week`;

    // TODO: Implement API call and subject push logic

  }

  fetchTraineeOverallRadarChart(traineeId: Number) {
    const endpoint = environment.context + `all/reports/trainee/${traineeId}/radar-trainee-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallRadarChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/radar-batch-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchAllTraineesRadarChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/radar-batch-all-trainees`;

    // TODO: Implement API call and subject push logic

  }

  /* Misc. */

  fetchBatchWeekAverageValue(batchId: Number, weekId: Number) {
    const endpoint = environment.context + `all/assessments/average/${batchId}/${weekId}`;

    // TODO: Implement API call and subject push logic

  }

  fetchTechnologiesForTheWeek(batchId: Number, weekId: Number) {
    const endpoint = environment.context + `all/assessments/categories/batch/${batchId}/${weekId}`;

    // TODO: Implement API call and subject push logic

  }
}
