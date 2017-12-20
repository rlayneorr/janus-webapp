import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee-tech-skills',
  templateUrl: './trainee-tech-skills.component.html',
  styleUrls: ['./trainee-tech-skills.component.css']
})
export class TraineeTechSkillsComponent implements OnInit {

  constructor() { }

  // Chart labels
  public radarChartLabels: string[] = ['AWS', 'Hibernate', 'JSP', 'Java', 'JavaScript', 'REST', 'SOAP', 'SQL', 'Spring'];

  // Dataset for chart
  // In practice this data should come from an API call
  public radarChartData: any = [
    {data: [88.75, 75.24, 77.77, 63.77, 77.47, 74.27, 74.27, 84.96, 87.10], label: 'Average'},
    {data: [100, 91.25, 90.60, 74.60, 86.24, 77.65, 77.65, 96.22, 88.89], label: '1'},
    {data: [100, 96.25, 96.58, 89.43, 93.47, 91.76, 91.76, 104.06, 94.08], label: '2'},
    {data: [100, 89.25, 94.87, 66.60, 86.86, 74.12, 74.12, 97.17, 88.89], label: '3'}
  ];

  // Chart type assignment
  public radarChartType = 'radar';

  ngOnInit() {
  }

}
