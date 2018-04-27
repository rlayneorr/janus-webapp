import { Pipe, PipeTransform } from '@angular/core';

import { Grade } from '../entities/Grade';
import { Assessment } from '../entities/Assessment';
import { Trainee } from '../../../hydra-client/entities/Trainee';

@Pipe({
  name: 'gradeByTraineeByAssessment'
})

export class GradeByTraineeByAssessmentPipe implements PipeTransform {

  transform(value: Grade[], trainee: Trainee, assessment: Assessment ): Grade[] {
    return value.filter( (grade) =>
      ( grade.assessment.assessmentId === assessment.assessmentId && grade.trainee.userId === trainee.userId ) );
  }

}
