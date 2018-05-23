import { Component, OnInit, ElementRef } from '@angular/core';
import { Message } from 'primeng/primeng';

// export libs
import { Ng2CsvService } from 'ng2csv';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  msgsQ: Message[] = [];
  headers = [
    'Name',
    'Curriculum',
    'Trainer',
    'Cotrainer',
    'Location',
    'Room',
    'Start',
    'End',
    'Progress'
  ];
  filterOptions: { label: string; icon: string; command: any }[] = [
    {
      label: 'Completed',
      icon: 'fa-circle',
      command: () => this.filter('complete')
    },
    {
      label: 'Starting soon',
      icon: 'fa-circle-o-notch',
      command: () => this.filter('starting-soon')
    }
  ];
  exportOptions: { label: string; icon: string; command: any }[] = [
    {
      label: 'PDF',
      icon: 'fa-file-pdf-o',
      command: () => {
        this.msgsQ.push({
          severity: 'info',
          summary: 'Exporting',
          detail: 'Exporting batches to PDF'
        });
        const date = new Date();
        const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;
        html2canvas(this.elRef.nativeElement.querySelector('p-dataTable'))
          .then(canvas => {
            const doc = new jsPDF();
            doc.addImage(canvas, 'JPEG', 10, 10, 190, 0);
            doc.save(`batches_${dateString}.pdf`);
          });
      }
    },
    {
      label: 'CSV',
      icon: 'fa-file-excel-o',
      command: () => {
        this.msgsQ.push({
          severity: 'info',
          summary: 'Exporting',
          detail: 'Exporting batches to CSV'
        });
        const date = new Date();
        const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;
        this.ng2csv.download(this.filteredBatches, `batches_${dateString}.csv`);
      }
    }
  ];
  batches = [
    {
      id: 187,
      name: '1708 Aug14 Java',
      endDate: '2017-10-20T08:00:00Z',
      startDate: '2017-08-14T08:00:00Z',
      cotrainer: 36,
      curriculum: 1,
      address: null,
      room: null,
      trainer: 13
    },
    {
      id: 191,
      name: '1610 Oct24 Java',
      endDate: '2017-01-06T10:00:00Z',
      startDate: '2016-10-24T08:00:00Z',
      cotrainer: 10,
      curriculum: 1,
      address: null,
      room: null,
      trainer: 11
    },
    {
      id: 192,
      name: '1611 Nov28 SDET',
      endDate: '2017-02-10T10:00:00Z',
      startDate: '2016-11-28T10:00:00Z',
      cotrainer: null,
      curriculum: 3,
      address: null,
      room: null,
      trainer: 7
    }
  ];

  filteredBatches = this.batches;

  constructor(private ng2csv: Ng2CsvService, private elRef: ElementRef) {}

  ngOnInit() {}

  private calculateBatchDuration(batch) {
    const ONE_DAY = 1000 * 3600 * 24;
    const ONE_WEEK = 7;
    const start = new Date(batch.startDate).getTime();
    const end = new Date(batch.endDate).getTime();
    const diff = Math.abs(start - end) / ONE_DAY;
    return Math.floor(diff / ONE_WEEK);
  }

  private calculateBatchWeekNumber(batch) {
    const ONE_DAY = 1000 * 3600 * 24;
    const ONE_WEEK = 7;
    const now = new Date(Date.now()).getTime();
    const start = new Date(batch.startDate).getTime();
    const numberOfDays = (now - start) / ONE_DAY;
    return Math.floor(numberOfDays / ONE_WEEK);
  }

  private calculateBatchProgress(batch) {
    const duration = this.calculateBatchDuration(batch);
    const batchWeek = this.calculateBatchWeekNumber(batch);
    const progress = batchWeek / duration * 100;
    return progress <= 100 ? progress : 100;
  }

  filter(command: string) {
    switch (command) {
      case 'all':
        this.filteredBatches = this.batches;
        break;
      case 'complete':
        this.filteredBatches = this.batches.filter(
          batch => this.calculateBatchProgress(batch) === 100
        );
        break;
      case 'starting-soon':
        this.filteredBatches = this.batches.filter(
          batch => this.calculateBatchWeekNumber(batch) === -2
        );
        break;
    }
  }
}
