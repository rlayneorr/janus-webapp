import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
// entities
import { PanelFeedback } from '../../entities/PanelFeedback';

// services
import { CategoryService } from '../../services/category.service';
import { Category } from '../../entities/Category';
import { CreatePanelComponent } from '../create-panel/create-panel.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-technical-feedback',
  templateUrl: './technical-feedback.component.html',
  styleUrls: ['./technical-feedback.component.css']
})
export class TechnicalFeedbackComponent implements OnInit {
  techList: Category[];
  filteredTechList: Category[] = [];

  @Input() technologyForm: FormGroup;

  /**
   *
   * @param categoryService
   */
  constructor(private categoryService: CategoryService) {
    this.technologyForm = new FormGroup({
       technology: new FormControl(),
       result: new FormControl(),
       status: new FormControl(),
       comment: new FormControl()
      });
  }

  /**
   * gets technology list and filters out duplicates
   */
  ngOnInit() {
    this.categoryService.listSubject.asObservable().subscribe(cats => {
      this.techList = cats;
    });
  }
}
