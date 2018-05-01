import { QuestionsTableComponent } from './questions-table.component';
import { FormsModule } from '@angular/forms';
import { BucketService } from '../../services/bucket/bucket.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UrlUtilService } from '../../services/UrlUtil/url-util.service';
import { QuestionService } from '../../services/question/question.service';
import { TagService } from '../../services/tag/tag.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { SkillTypeService } from '../../services/skillType/skill-type.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service';
import { QuestionsToBucketsUtil } from '../../util/questionsToBuckets.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    FormsModule
  ],
  providers: [
    BucketService, HttpClient, UrlUtilService, QuestionService, TagService, SimpleTraineeService,
    SkillTypeService, QuestionScoreService, QuestionsToBucketsUtil, NgbModal, NgbModalStack
  ],
  entryComponents: [
    NgbModalBackdrop,
  ],
})
export class QuestionTableModule { }
