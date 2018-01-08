/**
 * This PDF service takes a screenshot of an element and creates a PDF of that image.
 * IMPORTANT: You will need to install and import: jspdf and html2canvas.
 *      npm i jspdf --save
 *      npm install --save html2canvas
 *
 * Example:
 *      HTML
 *      <div id="chartToDownload"> ... </div>
 *      <button (click)="downloadPDF()">Download as PDF</button>
 *
 *      TypeScript
 *      constructor(private pdfService: PDFService) { }
 *      this.pdfService.downloadPDF('chartToDownload');
 *
 * @author Edel Benavides
 */

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PDFService {

  constructor(private http: HttpClient) { }

  /**
   * Creates a PDF from a given element id, then downloads it.
   * It creates an image of the elements and saves it as a PDF.
   * @param chartToDownload - Element id name.
   */
  public downloadPDF(chartToDownload): void {
    html2canvas(document.getElementById(chartToDownload)).then(canvas => {
        const pdf = new jsPDF();
        pdf.addImage(canvas, 'JPEG', 10, 10, 190, 0);
        pdf.save('report.pdf');
    });
  }

  /**
   * Creates a PDF with input name from a given element id, then downloads it.
   * It creates an image of the elements and saves it as a PDF.
   * @param chartToDownload - Element id name.
   * @param filename - Name of the file.
   */
  public downloadPDFwithFilename(chartToDownload, filename): void {
    html2canvas(document.getElementById(chartToDownload)).then(canvas => {
        const pdf = new jsPDF();
        pdf.addImage(canvas, 'JPEG', 10, 10, 190, 0);
        pdf.save(filename);
    });
  }

  /**
   * Creates a PDF with input name from a given element id, then downloads it.
   * It creates an image of the elements and saves it as a PDF.
   * @param chartToDownload - Element id name.
   * @param filename - Name of the file.
      * pdf: 8.5in x 11in => 180mm x 270mm => 531px x 787px
      * https://andrew.hedges.name/experiments/aspect_ratio/
      * (original height / original width) x new width = new height
      * (1200 / 1600) x 400 = 300
      * (original width / original height) x new height = new width
   */
  public downloadCharts(): void {
    const charts = document.getElementsByClassName('charts');
    const pdf = new jsPDF();  // default size in mm
    for (let i = 0; i < charts.length; i++) {
      charts[i].setAttribute('id', `chart${i}`);
      const originalHeight = charts[i].clientHeight;
      const originalWidth = charts[i].clientWidth;

        if (originalHeight > 787) {
          html2canvas(charts[i]).then(canvas => {
            // new heights and width in pixels
            let newHeight = 787;
            let newWidth = (originalWidth / originalHeight) * newHeight;

            // converts pixels to mm
            newHeight = (newHeight / 75) * 25.4;
            newWidth = (newWidth / 75) * 25.4;

            // Add image and safe PDF
            pdf.addImage(canvas, 'JPEG', 10, 10, newWidth, newHeight);
            pdf.addPage();
            if ((i + 1) === charts.length) {
              pdf.save('Charts');
            }
        });
      } else {  // else add image and add new page
          html2canvas(charts[i]).then(canvas => {
            // Add image and safe PDF
            pdf.addImage(canvas, 'JPEG', 10, 10, 180, 0);
            pdf.addPage();
            if ((i + 1) === charts.length) {
              pdf.save('Charts');
            }
          });
        }

    } // end for loop
  }

  /**
   * Downloads HTML body content. Sends request to server to generate PDF.
   */
  public downloadPDFwithFeedback() {
    const html = {'title': 'download', 'html': '<h3>PDF!!!</h3>'};
    this.http.post(environment.context + 'report/generate', html).subscribe(response => {
      console.log(response);
    },

    err => {
      console.log('Error generating PDF!');
      console.log(err);
    });
  }

}
