import { Pipe, PipeTransform } from '@angular/core';
import { Trainer } from '../../../entities/Trainer';

@Pipe({
  name: 'trainerPipe'
})
export class TrainerPipePipe implements PipeTransform {
  /**
   * Logic to filter out Active/Inactive Trainers
   * @param {*} trainers
   * @param {String} status
   * @returns {*}
   * @memberof TrainerPipePipe
   */
  transform(trainers: Trainer[], status: String): Trainer[] {
    if (status === 'ROLE_INACTIVE') {
      return trainers.filter(trainer => trainer.tier === status);
    } else {
      return trainers.filter(trainer => trainer.tier !== 'ROLE_INACTIVE');
    }
  }
}
