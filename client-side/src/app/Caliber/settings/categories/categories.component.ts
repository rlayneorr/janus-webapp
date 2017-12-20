import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Category } from '../../beans/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    model = new Category();
    @ViewChild('categoryName') category: ElementRef;

  constructor(private categoriesService: CategoriesService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  addCategory() {
      this.categoriesService.newCategory.skillCategory = this.model.skillCategory;
      console.log(this.categoriesService.newCategory.skillCategory);
      this.categoriesService.newCategory.active = true;
      this.categoriesService.addNewCategory();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }
}
