import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// entities
import { Trainee } from '../../entities/Trainee';

// components
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';

@Component({
  selector: 'app-create-panel',
  templateUrl: './create-panel.component.html',
  styleUrls: ['./create-panel.component.css']
})
export class CreatePanelComponent implements OnInit {
  closeResult: string;
  trainee: Trainee;
  constructor(private modalService: NgbModal, private searchBar: PanelSearchbarComponent) { }

  ngOnInit() {
<<<<<<< HEAD
    this.searchBar.getTraineeSubject().subscribe( (trainee) => {
=======
    this.searchBar.getTraineeSubject().subscribe((trainee) => {
>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619
      this.trainee = trainee;
    });
  }

  open(content) {
<<<<<<< HEAD
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
=======
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619
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
<<<<<<< HEAD
=======

  onSubmit() {

  }
>>>>>>> 27be40a5dd5b6c158f8178d90677dbd2bbb79619
}
