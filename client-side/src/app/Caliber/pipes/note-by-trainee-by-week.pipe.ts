import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../entities/Note';
import { Trainee } from '../entities/Trainee';

@Pipe({
  name: 'noteByTraineeByWeek'
})
export class NoteByTraineeByWeekPipe implements PipeTransform {

  transform(value: Note[], trainee: Trainee, week: number ): Note[] {

    return value.filter( (note) => {
        return (note != null && note.trainee != null && note.content != null && note.trainee.traineeId === trainee.traineeId && note.week === week);
      });
  }

}
