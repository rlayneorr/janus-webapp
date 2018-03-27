import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../../services/request-service/request.service';
import {ClientListService} from '../../services/client-list-service/client-list.service';
import {Subject} from 'rxjs/Subject';
import {Client} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';
import {SelectedStatusConstants} from '../../constants/selected-status.constants';
import {ThemeConstants} from '../../constants/theme.constants';
import {Color} from 'ng2-charts';
import {StatusInfo} from '../../models/status-info.model';
import {MarketStatusService} from '../../services/market-status/market-status.service';
import {AssociateService} from '../../services/associates-service/associates-service';
import {InterviewService} from '../../services/interview-service/interview-service';
import {PlacementService} from '../../services/placement-service/placement.service';

/**
 * @author Han Jung
 * @description Translation of clientCtrl.js
 */
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  public showNoData: boolean = false;
  public selectedCompany: string;
  public clientInfo: Client[];
  public clientNames: string[] = [];
  public client$: any;
  public searchName;
  // chart variable
  public barChartLabel: string[] = SelectedStatusConstants.CLIENT_LABELS;
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartColors: Array<Color> = ThemeConstants.BAR_COLORS;

  public barChartOptions: any = {
    display: true,
    position: 'right',
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {position: 'right'},
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function (tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel;
        }
      }
    }
  };
  // data values initialize to 1 for animation
  public barChartData: any[] = [{data: [0, 0, 0, 0], label: 'Mapped'}, {data: [0, 0, 0, 0], label: 'Unmapped'}];


  constructor(private rs: RequestService,
              private clientService: ClientListService,
              private marketStatus: MarketStatusService,
              private associates: AssociateService,
              private interviews: InterviewService,
              private placement: PlacementService,) {
  }

  ngOnInit() {
    this.getAllClients();
  }

  // get client names from data and push to clientNames string array
  getAllClients() {
    let self = this;
    this.clientInfo = [];
    this.clientService.getAllClients().subscribe(clients => {
      this.associates.getAllAssociates().subscribe(associates => {
        // console.log(clients);
        // console.log(associates);

        clients.forEach(client => {
          let a = associates.filter(items => items['clientId'] === client['clientId']);
          a.forEach(items => {
            this.marketStatus.getMarketingStatusById(items['marketingStatusId']).subscribe(status => {
              console.log(status);
              const tempClient: Client = {
                id: client['clientId'],
                name: client['clientName'],
                tfClientName: client['clientName'],
                placements: null,
                associates: null,
                interviews: null,
                stats: status,
              };
              // console.log('--------');
              // console.log(tempClient);
              this.clientInfo.push(tempClient);
              this.clientNames.push(tempClient.tfClientName);
            });
          });
        });
      });
    });

    setTimeout(() => {
      this.initChartData();
    }, 4000);


    // this.marketStatus.getAllMarketingStatusMapped().subscribe(items => {
    //   console.log(items);
    // });
    //
    // this.placement.getAllPlacements().subscribe(items => {
    //   console.log(items);
    // });
    //
    // this.interviews.getAllInterviews().subscribe(items => {
    //   console.log(items);
    // });
    //
    // this.marketStatus.getAllMarketingStatus().subscribe(items => {
    //   console.log(items);
    // });
    //
    // this.associates.getAllAssociates().subscribe(items => {
    //   console.log(items);
    // });

    // this.clientService.getAllClients().subscribe(
    //   clients => {
    //     console.log(clients);
    //     // save array of object Client
    //     self.clientInfo = clients;
    //     // clear name list to reload list and run through filter
    //     self.clientNames.length = 0;
    //     // push list of names to an array
    //     for (let client of clients) {
    //       // Hide clients who do not have associates
    //       let stats = client.stats;
    //       // if (!this.showNoData) {
    //         if (stats.trainingMapped > 0 || stats.trainingUnmapped > 0 ||
    //           stats.reservedMapped > 0 || stats.openUnmapped > 0 ||
    //           stats.selectedMapped > 0 || stats.selectedUnmapped > 0 ||
    //           stats.confirmedMapped > 0 || stats.confirmedUnmapped > 0)
    //           this.clientNames.push(client.tfClientName);
    //       //}
    //       // else {
    //       //   this.clientNames.push(client.tfClientName);
    //       // }
    //     }
    //     this.initChartData();
    //   }, err => {
    //     console.error("Failed grabbing names");
    //   });
  }

  initChartData() {
    this.selectedCompany = "";
    // aggregate client info into overall statistics
    let trainingMapped = 0;
    let reservedMapped = 0;
    let selectedMapped = 0;
    let confirmedMapped = 0;
    let trainingUnmapped = 0;
    let openUnmapped = 0;
    let selectedUnmapped = 0;
    let confirmedUnmapped = 0;
    // for (let i=0;i<this.clientInfo.length;i++) {
    //   let client: Client = this.clientInfo[i];
    //   let stats: StatusInfo = client.stats;
    //   trainingMapped += stats.trainingMapped;
    //   reservedMapped += stats.reservedMapped;
    //   selectedMapped += stats.selectedMapped;
    //   confirmedMapped += stats.confirmedMapped;
    //   trainingUnmapped += stats.trainingMapped;
    //   openUnmapped += stats.openUnmapped;
    //   selectedUnmapped += stats.selectedUnmapped;
    //   confirmedUnmapped += stats.confirmedUnmapped;
    // }

    for(let i = 0; i < this.clientInfo.length; i++)
    {
      console.log(this.clientInfo[i]['stats']['marketingStatusName']);
      let status = this.clientInfo[i]['stats']['marketingStatusName'].toLowerCase();
      if(status.includes('unmapped')) {
        console.log('unmapped');
        if(status.includes('training')){
          trainingUnmapped++;
        }
      }else{
        if(status.includes('training')){
          trainingMapped++;
        }
      }
    }

    this.barChartData = [
      {
        data: [trainingMapped, reservedMapped, selectedMapped, confirmedMapped],
        label: 'Mapped',
      },
      {
        data: [trainingUnmapped, openUnmapped, selectedUnmapped, confirmedUnmapped],
        label: 'Unmapped',
      }
    ]
  }

  // get client name and find id to request client information
  getOneClient(name: string) {
    this.selectedCompany = name;
    let oneClient = this.clientInfo.find(item => item['tfClientName'] == name);
    this.clientService.getOneClient(oneClient.id).subscribe(
      client => {
        console.log(client);
        this.client$ = client;
        this.barChartData = [
          {
            data: [this.client$.stats.trainingMapped, this.client$.stats.reservedMapped, this.client$.stats.selectedMapped, this.client$.stats.confirmedMapped],
            label: 'Mapped',
          },
          {
            data: [this.client$.stats.trainingUnmapped, this.client$.stats.openUnmapped, this.client$.stats.selectedUnmapped, this.client$.stats.confirmedUnmapped],
            label: 'Unmapped',
          }
        ]
      }, err => {
        console.error("Failed grabbing client");
      });
  }
}
