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

// These are the pdf width and height in pixels
const pdfHeight = 787;
const pdfWidth = 531;

@Injectable()
export class PDFService {

  constructor(private http: HttpClient) { }

  /**
   * Creates a PDF with input name from a given element id, then downloads it.
   * It creates an image of the elements and saves it as a PDF.
   * @param chartToDownload - Element id name.
   * @param filename - Name of the file.
   */
  public downloadPDFwithFilename(chartToDownload, filename): void {
    const chart = document.getElementById(chartToDownload);
    let newHeight = 0;
    let newWidth = 180;
    html2canvas(chart).then(canvas => {
        const pdf = new jsPDF();
        if (chart.clientHeight > pdfHeight) {
          newWidth = this.getNewWidth(chart.clientHeight, chart.clientWidth);
          newHeight = this.convertPixelsToMM(pdfHeight);
        }

        if (chart.clientWidth > pdfWidth ) {
          newWidth = this.convertPixelsToMM(pdfWidth);
          newHeight = this.getNewHeight(chart.clientHeight, chart.clientWidth);
        }
        pdf.addImage(canvas, 'JPEG', 10, 10, newWidth, newHeight);
        pdf.save(filename);
    });
  }

  /**
   * Creates a PDF with input name from a given element id, then downloads it.
   * It creates an image of the elements and saves it as a PDF.
   * @param chartToDownload - Element id name.
   * @param filename - Name of the file.
   */
  public downloadCharts(): void {
    const charts = document.getElementsByClassName('charts');
    const pdf = new jsPDF();  // default size in mm
    for (let i = 0; i < charts.length; i++) {
      charts[i].setAttribute('id', `chart${i}`);
      const originalHeight = this.convertPixelsToMM(charts[i].clientHeight);
      const originalWidth = this.convertPixelsToMM(charts[i].clientWidth);

      html2canvas(charts[i]).then(canvas => {
        canvas = canvas.toDataURL('image/jpeg', 1);
        // Ignore canvas if it's not an image
        if (canvas.match('image/jpeg')) {
          // new heights and width in pixels
          let newHeight = 0;
          let newWidth = 180;

          if (charts[i].clientHeight > pdfHeight) {
            newWidth = this.getNewWidth(charts[i].clientHeight, charts[i].clientWidth);
            newHeight = this.convertPixelsToMM(pdfHeight);
            if ( ( (newWidth / 25.4) * 75) > pdfWidth) {
              newWidth = 180;
              newHeight = 0;
            }
          } else if (charts[i].clientWidth > pdfWidth) {
            newWidth = this.convertPixelsToMM(pdfWidth);
            newHeight = this.getNewHeight(charts[i].clientHeight, charts[i].clientWidth);
            if ( ( (newWidth / 25.4) * 75) > pdfWidth) {
              newWidth = newWidth / 1.2;
              newHeight = newHeight / 1.2;
            }
          }

          // Add image to PDF
          pdf.addImage(canvas, 'JPEG', 10, 10, newWidth, newHeight);

          // SAVE PDF
          if ((i + 1) === charts.length) {
            pdf.save('Charts');
          } else {
            // Add new page
            pdf.addPage();
          }
        } else {
          // SAVE PDF
          if ((i + 1) === charts.length) {
            pdf.save('Charts');
          }
        }

      }); // end html2canvas

    } // end for loop
  }

  /**
   * Downloads HTML body content. Sends request to server to generate PDF.
   * Pending implementation.
   * @ignore Implementation not completed.
   */
  public downloadPDFwithFeedback() {
    const html = '';
    this.http.post(environment.context + 'report/generate', html).subscribe(response => {
      // console.log(response);
    },

    err => {
      // console.log('Error generating PDF!');
      // console.log(err);
    });
  }

  convertPixelsToMM(number) {
    return (number / 75 ) * 25.4;
  }

  /**
   * Returns new width in mm based pdfHeight.
   */
  getNewWidth(originalHeight, originalWidth) {
    // (original width / original height) x new height = new width
    const newWidth = (originalWidth / originalHeight) * pdfHeight;
    return this.convertPixelsToMM(newWidth);
  }

  /**
   * Returns new height in mm based pdfHeight.
   */
  getNewHeight(originalHeight, originalWidth) {
    // (original height / original width) x new width = new height
    const newHeight = (originalHeight / originalWidth) * pdfWidth;
    return this.convertPixelsToMM(newHeight);
  }

}
