import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayTier'
})
export class TierPipe implements PipeTransform {
    transform(tier: String) {
       let index = 0;
       while (tier.charAt(index) !== '_') {
           index++;
       }
       // tier = tier.substring(index + 1).toLowerCase();
      // tier = tier.
       return tier.substring(index + 1);
    }
}
