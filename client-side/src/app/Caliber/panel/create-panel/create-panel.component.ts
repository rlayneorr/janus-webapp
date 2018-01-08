import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms/';


// entities
import { Trainee } from '../../entities/Trainee';

// components
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';

@Component({
  selector: 'app-create-panel',
  templateUrl: './create-panel.component.html',
  styleUrls: ['./create-panel.component.css'],
  encapsulation: ViewEncapsulation.None,  // Use the native Shadow DOM to encapsulate our CSS

})
export class CreatePanelComponent implements OnInit {
  closeResult: string;
  trainee: Trainee;
  panelForm: FormGroup;
  // technologies: FormGroup;
  constructor(private modalService: NgbModal, private searchBar: PanelSearchbarComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchBar.getTraineeSubject().subscribe((trainee) => {
      this.trainee = trainee;
    });

    this.panelForm = this.fb.group({
      interviewForm: this.fb.group({
        interviewDate: [''],
        format: [''],
        recordingConsent: [''],
        internet: ['']
      }),
        feedback: this.fb.array([])
    });
    this.addFeedback();
  }

  initFeedback() {
    return this.fb.group({
      technology: [''],
      result: [''],
      status: [''],
      comment: ['']
    });
  }

  addFeedback() {
    const control = <FormArray>this.panelForm.controls['feedback'];
    const feedbCtrl = this.initFeedback();

    control.push(feedbCtrl);
    console.log('added feedback');
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {

  }
}
