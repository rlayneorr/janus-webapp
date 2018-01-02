import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {

  transform(input: Array<any>, property: string): Array<any> {

    if (!input || !property || this.resolveProperty(input[0], property) === undefined) { return input; }

    input.sort((a: any, b: any) => {
      const propA = this.resolveProperty(a, property);
      const propB = this.resolveProperty(b, property);
      return propA - propB;
    });

    return input;
  }

  resolveProperty(obj: any, path: string) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined;
    }, obj || self);
  }
}
